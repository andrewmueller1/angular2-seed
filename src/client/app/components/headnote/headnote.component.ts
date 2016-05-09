import {Component, Input} from 'angular2/core';

@Component({
  selector: 'metadata-panel',
  templateUrl: '/dist/dev/app/components/headnote/headnote.component.html'
})

export class HeadnoteComponent {
  @Input() text: string;
  constructor() {
  }
}
