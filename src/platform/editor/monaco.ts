import {AfterViewInit, Component, EventEmitter, forwardRef, Inject, Input, NgZone, Output} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {MONACO_EDITOR_CONFIG, MonacoEditorConfig} from "./config";


let loadedMonaco: boolean = false;
let loadPromise: Promise<void>;

@Component({
  template: "",
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Monaco),
    multi: true
  }]
})
export class Monaco implements AfterViewInit, ControlValueAccessor {
  @Output() onInit = new EventEmitter<any>();
  @Input() initMonaco: any;
  public value: string = "";
  public editor: any;
  public _options: any;
  public windowResizeSubscription: Subscription;
  propagateChange = (_: any) => {
  };
  onTouched = () => {
  };

  constructor(protected zone: NgZone,
              @Inject(MONACO_EDITOR_CONFIG) protected config: MonacoEditorConfig) {
  }

  writeValue(value: any): void {
    this.value = value || "";
    // Fix for value change while dispose in process.
    setTimeout(() => {
      if (this.editor) {
        this.editor.setValue(this.value);
      }
    });

  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @Input("options")
  set options(options: string) {
    this._options = Object.assign({}, this.config.defaultOptions, options);
    if (this.editor) {
      this.editor.dispose();
      this.initMonaco(options);
    }
  }

  get options(): string {
    return this._options;
  }

  ngAfterViewInit(): void {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco(this.options);
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = this.config.baseUrl || "/assets";
        if (typeof((<any>window).monaco) === "object") {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({paths: {"vs": `${baseUrl}/monaco/vs`}});
          (<any>window).require(["vs/editor/editor.main"], () => {
            if (typeof this.config.onMonacoLoad === "function") {
              this.config.onMonacoLoad();
            }
            this.initMonaco(this.options);
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement("script");
          loaderScript.type = "text/javascript";
          loaderScript.src = `${baseUrl}/monaco/vs/loader.js`;
          loaderScript.addEventListener("load", onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

}
