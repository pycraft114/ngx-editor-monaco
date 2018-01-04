# Monaco Editor Component for Angular 2 and above.

Using this Module you can utilize the Monaco Editor as an Angular Component. Feel free to contribute, raise feature requests and make it better.

Supports all the options available in monaco-editor [Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)

## Setup

### Installation

Install from npm repository:
```
npm install ngx-editor-monaco --save
 ```
 
Add the glob to assets in .angular-cli.json (to make monaco-editor lib available to the app):
```typescript
{
  "apps": [
    {
      "assets": [
        { "glob": "**/*", "input": "../node_modules/ngx-editor-monaco/assets/monaco", "output": "./assets/monaco/" }
      ],
      ...
    }
    ...
  ],
  ...
}
 ```

### Sample
Include MonacoEditorModule in Main Module and Feature Modules where you want to use the editor component.(eg: app.module.ts): 
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-editor-monaco';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Create Editor options in component.(eg: app.component.ts)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
```
Include editor in html with options and ngModel bindings.(eg: app.component.html)
```html
<monaco-editor [options]="editorOptions" [(ngModel)]="code"></monaco-editor>
```

Include diff-editor in html with options and property binding of previousCode and currentCode
```html
<monaco-diff-editor [options]="editorOptions" [previousCode]="previousCode" [currentCode]="currentCode"></monaco-diff-editor>

ex) previousCode = {
      code: `
        `(function(jit_createRendererType2_0,jit_viewDef_1,jit_textDef_2,jit_elementDef_3,jit_View_EditorComponent_0_4,jit__object_Object__5,jit_providerDef_6,jit_InjectionToken_NgValueAccessor_7,jit_EditorComponent_8,jit_directiveDef_9,jit_NgZone_10
        /*\`\`*/) {
        var styles_AppComponent = [];
        var RenderType_AppComponent = jit_createRendererType2_0({encapsulation:2,styles:styles_AppComponent,
            data:{}});
        function View_AppComponent_0(_l) {
          return jit_viewDef_1(0,[(_l()(),jit_textDef_2(null,['\\n    '])),(_l()(),jit_elementDef_3(0,
              null,null,1,'h1',[],null,null,null,null,null)),(_l()(),jit_textDef_2(null,['\\n      Welcome to ',
              '!!\\n    '])),(_l()(),jit_textDef_2(null,['\\n    '])),(_l()(),jit_elementDef_3(0,
              null,null,2,'ngx-editor-monaco',[['flex',''],['language','javascript'],['style',
                  'height: 200px'],['theme','vs-dark']],null,null,null,jit_View_EditorComponent_0_4,
              jit__object_Object__5)),jit_providerDef_6(5120,null,jit_InjectionToken_NgValueAccessor_7
      `,
      language: 'javascript'
    }
    
    currentCode = {
      code: '',
      language: 'javascript'
    }
```

### Styling
Add class to editor tag. (eg. class="my-code-editor")
```html
<monaco-editor class="my-code-editor" [options]="editorOptions" [(ngModel)]="code"></monaco-editor>
```
Add styling in css/scss file:
```scss
.my-code-editor {
  .editorContainer {
    height: calc(100vh - 100px);
  }
}
```
Set automaticLayout option to adjust editor size dynamically. Recommended when using in modal dialog or tabs where editor is not visible initially.

### Events
Output event (onInit) expose editor instance that can be used for performing custom operations on the editor. 
```html
<monaco-editor [options]="editorOptions" [(ngModel)]="code" (onInit)="onInit($event)"></monaco-editor>
```

```typescript
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  onInit(editor) {
      let line = editor.getPosition();
      console.log(line);
    }
}
```

## Configurations
`forRoot()` method of MonacoEditorModule accepts config of type `NgxMonacoEditorConfig`.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-editor-monaco';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'app-name/assets', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass deafult options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be avilable as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)
