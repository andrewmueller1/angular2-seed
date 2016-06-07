import {Component, Input} from '@angular/core';
import {AppConfigSummary} from '../../appConfigSummary';

@Component({
  selector: 'metadata-panel',
  templateUrl: AppConfigSummary.getTemplatePath() + '/app/judicialSummary/components/headnote/headnote.component.html'
})

export class HeadnoteComponent {
  @Input() text: string;
  constructor() {
  }
}
