import {Injector, ComponentRef, ComponentResolver, ComponentFactory} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
import {Widget} from 'jw';
import {HeadnoteComponent} from './headnote.component';
import {WidgetComponentContainer} from '../../workbench/widgetComponentContainer';

export class HeadnoteComponentContainer extends WidgetComponentContainer {
    protected componentInstance : HeadnoteComponent;
    
    constructor() {
        super(HeadnoteComponent);
    }
    
    public setComponent(component : ComponentRef) {
        super.setComponent(component);
        this.componentInstance = this.component.instance;
        
        // Map widget => component Inputs.
        this.widget.pageController.subscribe("refresh", this.widget.id, (data: jw.EventData) => {
            this.componentInstance.text = data.publisherData.text;
            this.component.hostView.detectChanges();
        });
        
        // Map component => widget Outputs.
    }
    
    // this.pageController.subscribe("refresh", this.id, function(event) {
	// 	$this.displayHeadnote();
	// });
}
