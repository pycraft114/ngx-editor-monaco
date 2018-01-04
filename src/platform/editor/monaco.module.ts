import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {MONACO_EDITOR_CONFIG, MonacoEditorConfig} from "./config";
import {Monaco} from "./monaco";
import {EditorComponent} from "./editor.component";
import {DiffEditorComponent} from "./diff-editor.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Monaco,
    EditorComponent,
    DiffEditorComponent
  ],
  exports: [
    EditorComponent,
    DiffEditorComponent
  ]
})
export class MonacoModule {
  public static forRoot(config: MonacoEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: MonacoModule,
      providers: [
        {provide: MONACO_EDITOR_CONFIG, useValue: config}
      ]
    };
  }
}
