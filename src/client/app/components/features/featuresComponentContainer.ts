import {Injector, ComponentRef, ComponentResolver, ComponentFactory, Type} from '@angular/core';
import {FeaturesComponent} from './features.component';
import {WidgetComponentContainer} from '../../workbench/widgetComponentContainer';

export class FeaturesComponentContainer extends WidgetComponentContainer<FeaturesComponent> {
    protected component: ComponentRef<FeaturesComponent>;
    
    constructor(params: any) {
        super(params, FeaturesComponent);
    }

    protected mapComponentToWidget() {
        super.mapComponentToWidget();
        // Map widget => component Inputs.
        
        // Map component => widget Outputs.
        this.component.instance.onInputKeyUp.subscribe((text: string) => {
            this.pageController.publish("update", this.id, { "text": text });
        });
    }
}
