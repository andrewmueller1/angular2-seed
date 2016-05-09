import {Injector, ComponentRef, ComponentResolver, ComponentFactory} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
import {Widget} from 'jw';
import {FeaturesComponentContainer} from '../components/features/featuresComponentContainer';

export abstract class WidgetComponentContainer {
    protected component: ComponentRef;
    protected componentInstance: any;
    protected widget: Widget;
    
    public componentType : Type;

    constructor(type : Type) {
        this.componentType = type;
    }
    
    public setComponent(component : ComponentRef) : void {
        this.component = component;
    }
    
    public setWidget(widget: Widget) : void {
        this.widget = widget;
    }
}
