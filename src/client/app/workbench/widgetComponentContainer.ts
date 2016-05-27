import {Injector, ComponentRef, ComponentResolver, ComponentFactory, Type} from '@angular/core';
import {Widget} from 'jw';
import {FeaturesComponentContainer} from '../components/features/featuresComponentContainer';

export abstract class WidgetComponentContainer extends Widget {
    protected component: ComponentRef<any>;
    protected componentInstance: any;
    protected widget: Widget;
    
    public componentType : Type;
    
    public setComponent(component : ComponentRef<any>) : void {
        this.component = component;
    }
    
    public setWidget(widget: Widget) : void {
        this.widget = widget;
    }
}
