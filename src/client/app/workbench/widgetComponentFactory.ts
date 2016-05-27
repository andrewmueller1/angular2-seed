import {Injector, Injectable, ComponentRef, ComponentResolver, ComponentFactory, Type} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';

@Injectable()
export class WidgetComponentFactory {
    private componentResolver: ComponentResolver;
    private injector: Injector;

    constructor(componentResolver: ComponentResolver, injector: Injector) {
        this.componentResolver = componentResolver;
        this.injector = injector;
    }

    public create<T>(componentType: Type, divContainer: Node): Observable<ComponentRef<T>> {

        var observable: Observable<ComponentRef<T>> = Observable.create((observer: Observer<ComponentRef<T>>) => {
            // Instantiate component.
            this.componentResolver.resolveComponent(componentType).then((componentFactory: ComponentFactory<T>) => {
                // Inject WorkBench dependencies.
                // TODO: Currently there is no good way to create a child injector from an Injector instance.
                var componentInjector = this.injector;

                // Create component
                observer.next(componentFactory.create(componentInjector, undefined, divContainer));
            });

        });
        return observable;
    }
}
