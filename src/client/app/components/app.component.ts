import {Component} from '@angular/core';

@Component({
  selector: 'sd-app',
  template: ''
})
export class AppComponent {
  
  constructor() {}
}

(<any>window).blah = AppComponent;
