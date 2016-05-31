import {Component, Input} from '@angular/core';

@Component({
  selector: 'patents',
  templateUrl: '/dist/dev/app/components/patents/patents.component.html'
})

export class HeadnoteComponent {
  @Input() text: string;
  constructor() {
  }
}
