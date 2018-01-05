import {Component, ElementRef, forwardRef, Inject, Input, NgZone, ViewChild} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {fromEvent} from "rxjs/observable/fromEvent";
import {Monaco} from "./monaco";
import {MONACO_EDITOR_CONFIG, MonacoEditorConfig} from "./config";

@Component({
  selector: "monaco-diff-editor",
  template: `
    <div class="diff-editor-container" #diffEditorContainer></div>`,
  styles: [`
    :host {
      display: block;
      height: 200px;
    }

    .diff-editor-container {
      width: 100%;
      height: 98%;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DiffEditorComponent),
    multi: true
  }]
})
export class DiffEditorComponent extends Monaco {
  @ViewChild("diffEditorContainer") diffEditorContainer: ElementRef;
  @Input() previousCode: {
    code: string,
    language: string
  };
  @Input() currentCode: {
    code: string,
    language: string
  };


  constructor(protected zone: NgZone,
              @Inject(MONACO_EDITOR_CONFIG) protected config: MonacoEditorConfig) {
    super(zone, config);
  }

  @Input() initMonaco = (options: any) => {
    const previousCode = monaco.editor.createModel(this.previousCode.code, this.previousCode.language);
    const currentCode = monaco.editor.createModel(this.currentCode.code, this.currentCode.language);

    this.editor = monaco.editor.createDiffEditor(this.diffEditorContainer.nativeElement, options);
    this.editor.setModel({
      original: previousCode,
      modified: currentCode
    });

    // refresh layout on resize event.
    if (this.windowResizeSubscription) {
      this.windowResizeSubscription.unsubscribe();
    }
    this.windowResizeSubscription = fromEvent(window, "resize").subscribe(() => this.editor.layout());
    this.onInit.emit(this.editor);
  };

}
