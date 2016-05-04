import {Component, Input, ElementRef, DynamicComponentLoader, Injector, ComponentResolver, ViewContainerRef, ComponentFactory} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {AngularComponent} from './angular.component';

export class BridgeService implements WorkBench.Bridge {
    private componentResolver: ComponentResolver;
    private injector: Injector;
    private viewContainerRef: ViewContainerRef;


    constructor() { }

    public registerRootComponent(componentResolver: ComponentResolver, injector: Injector, viewContainerRef: ViewContainerRef) {
        this.componentResolver = componentResolver;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
    }

    public addComponent(name: string, anchorElement: Element): void {
        this.componentResolver.resolveComponent(AngularComponent).then((componentFactory: ComponentFactory) => {
            componentFactory.create(this.injector, undefined, anchorElement);
            //this.viewContainerRef.createComponent(componentFactory, undefined, this.injector, [[anchorElement]]);
        });
    }

    public subscribe(id: string): WorkBenchComponentWrapper {
        var componentWrapper = new WorkBenchComponentWrapper();
        // Call into existing workbench code and use the "id" value to map to the WidgetContainer


        return componentWrapper;
    }

}

export class WorkBenchComponentWrapper {
    public observable: Observable<any>;

    constructor() {
        this.observable = new Observable<any>();
    }

}
