import {ComponentRef, Type} from '@angular/core';
import {WidgetComponentFactory} from './widgetComponentFactory'

export abstract class WidgetComponentContainer<T> extends jw.Widget {
    protected component: ComponentRef<T>;
    private componentType: Type;
    private widgetComponentFactory: WidgetComponentFactory;
    
    constructor(params: any, componentType: Type) {
        super(params);
        this.componentType = componentType;

        // TODO: This should be inject with the params argument.
        this.widgetComponentFactory = (<any>window).widgetComponentFactory;
    }
    
    public render(divContainer: Node) {
        super.render(divContainer);
        // Create component.
        var observable = this.widgetComponentFactory.create<T>(this.componentType, divContainer);
        observable.subscribe((component : ComponentRef<T>) => {
            this.component = component;
            
            // Map component to widget API.
            this.mapComponentToWidget();
            
            // Execute component life cycle.
            component.changeDetectorRef.detectChanges();
        });
        
    }
    
    protected mapComponentToWidget(): void {
    }
}


