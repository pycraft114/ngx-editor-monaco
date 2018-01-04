import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NGX_MONACO_EDITOR_CONFIG, NgxMonacoEditorConfig } from './config';
import { Monaco } from './monaco';
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
  public static forRoot(config: NgxMonacoEditorConfig = {}): ModuleWithProviders {
    return {
      ngModule: MonacoModule,
      providers: [
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
      ]
    };
  }
}
