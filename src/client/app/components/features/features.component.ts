import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Widget} from 'jw';

@Component({
  selector: 'features',
  templateUrl: '/dist/dev/app/components/features/features.component.html'
})

export class FeaturesComponent {
  private widget : Widget;
  
  @Output() onInputKeyUp : EventEmitter<string>;
  
  constructor() {
      this.onInputKeyUp = new EventEmitter<string>();
  }
  
  private onKeyUp(text: string) {
      this.onInputKeyUp.emit(text);
  }
  // var $this = this;
	// this.inputText.addEventListener("keyup", function(evt) {
	// 	console.log("$this.inputText.value=" + $this.inputText.value);
	// 	$this.pageController.dummyService.updateHeadnote(1, $this.inputText.value);
	// 	$this.pageController.publish("update", $this.id, { "text": $this.inputText.value });
	// });
}
