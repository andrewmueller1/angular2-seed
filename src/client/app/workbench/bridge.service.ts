import {Component, Input, ElementRef, DynamicComponentLoader, Injector, ComponentResolver, ViewContainerRef, ComponentFactory} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {EditorComponent} from '../components/editor/components/editor.component';

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
        this.componentResolver.resolveComponent(EditorComponent).then((componentFactory: ComponentFactory) => {
            var component = componentFactory.create(this.injector, undefined, anchorElement);
            component.hostView.detectChanges();
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
