import {Injector, ComponentRef, ComponentResolver, ComponentFactory} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
import {Widget} from 'jw';
import {FeaturesComponent} from './features.component';
import {WidgetComponentContainer} from '../../workbench/widgetComponentContainer';

export class FeaturesComponentContainer extends WidgetComponentContainer {
    protected componentInstance : FeaturesComponent;
    
    constructor() {
        super(FeaturesComponent);
    }
    
    public setComponent(component : ComponentRef) {
        super.setComponent(component);
        this.componentInstance = this.component.instance;
        
        // Map widget => component Inputs.
        
        // Map component => widget Outputs.
        // this.componentInstance.onInputKeyUp.add((text: string) => {
        //     alert(text);
            
        // });
        
        this.componentInstance.onInputKeyUp.subscribe((text: string) => {
            this.widget.pageController.publish("update", this.widget.id, { "text": text });
        });
    }
}
