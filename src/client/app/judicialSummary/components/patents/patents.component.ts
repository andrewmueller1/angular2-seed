import {Component, Input} from '@angular/core';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs'
import {AppConfigSummary} from '../../appConfigSummary';

@Component({
  selector: 'patents',
  directives: [MD_TABS_DIRECTIVES],
  templateUrl: AppConfigSummary.getTemplatePath() + '/app/judicialSummary/components/patents/patents.component.html'
})

export class PatentsComponent {
  @Input() text: string;
  public content: string;
  public tabs:Array<any> = [
    {title: 'Summary Text', content: 'Dynamic content 1'},
    {title: 'Metadata', content: 'Dynamic content 2'}
  ];
  
  constructor() {
    this.content = 'test';
  }
  
  public setActiveTab(index:number):void {
    this.tabs[index].active = true;
  };
}
