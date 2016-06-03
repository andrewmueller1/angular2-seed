import {Component, ApplicationRef} from '@angular/core';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs'


@Component({
  selector: 'sd-app',
  directives: [MD_TABS_DIRECTIVES],
  template: `<div id="testMain"></div>`
})
export class AppComponent {
  public content: string;
  
  constructor(private _app: ApplicationRef) {
    this.content = 'test';
  }
}
