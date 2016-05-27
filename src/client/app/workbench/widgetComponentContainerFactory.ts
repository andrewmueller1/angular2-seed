import {Injector, Injectable, ComponentRef, ComponentResolver, ComponentFactory, Type} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs/Rx';
import {Widget} from 'jw';
import {WidgetComponentContainer} from './widgetComponentContainer';
import {FeaturesComponentContainer} from '../components/features/featuresComponentContainer';
import {HeadnoteComponentContainer} from '../components/headnote/headnoteComponentContainer';
    
@Injectable()
export class WidgetComponentContainerFactory {
    private componentResolver: ComponentResolver;
    private injector: Injector;
    
    constructor(componentResolver: ComponentResolver, injector: Injector) {
        this.componentResolver = componentResolver;
        this.injector = injector;
    }

    public create<T>(widgetComponentContainerType: T, widget: jw.Widget): Observable<WidgetComponentContainer> {
        
        
        var observable : Observable<WidgetComponentContainer> = Observable.create((observer: Observer<WidgetComponentContainer>) => {
            // Get component specific widget container.
            var widgetComponentContainer = this.mapNameToContainerType(componentName);
            widgetComponentContainer.setWidget(widget);

            // Build component
            this.componentResolver.resolveComponent(widgetComponentContainer.componentType).then((componentFactory: ComponentFactory<any>) => {
                // Inject WorkBench dependencies.
                // TODO: Currently there is no good way to create a child injector from an Injector instance.
                var componentInjector = this.injector;

                // Create component
                var component = componentFactory.create(componentInjector, undefined, widget.divContainer);

                // Inject manually here intill we can inject and injector.
                component.instance.pageController = widget.pageController;

                // Execute component life cycle.
                component.changeDetectorRef.detectChanges();

                // Resolve promise with component wrapper.
                widgetComponentContainer.setComponent(component);
                observer.next(widgetComponentContainer);
            });
        });
        return observable;
    }

    private mapNameToContainerType(componentName: string): WidgetComponentContainer {
        var widgetComponentContainer: WidgetComponentContainer = undefined;
        switch (componentName) {
            case "FeaturesComponent":
                widgetComponentContainer = new FeaturesComponentContainer();
                break;
            case "HeadnoteComponent":
                widgetComponentContainer = new HeadnoteComponentContainer();
                break;
            // case "MetadataPanelComponent":
            //     widgetComponentContainer = MetadataPanelComponent;
            //     break;
        }
        return widgetComponentContainer;
    }
}
