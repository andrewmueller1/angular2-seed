import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {DROPDOWN_DIRECTIVES, TAB_DIRECTIVES} from '../../../../../node_modules/ng2-bootstrap'

@Component({
  selector: 'patents',
  directives: [CORE_DIRECTIVES, DROPDOWN_DIRECTIVES, TAB_DIRECTIVES],
  templateUrl: '/dist/dev/app/components/patents/patents.component.html'
})

export class PatentsComponent {
  @Input() text: string;
  public tabs:Array<any> = [
    {title: 'Summary Text', content: 'Dynamic content 1'},
    {title: 'Metadata', content: 'Dynamic content 2'}
  ];
  
  constructor() {
  }
  
  public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };
}
