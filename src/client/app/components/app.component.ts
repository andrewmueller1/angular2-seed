import {Component, ComponentResolver, ViewContainerRef, Injector} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {BridgeService} from '../workbench/bridge.service'
import {AngularComponent} from '../workbench/angular.component'

@Component({
  selector: 'sd-app',
  templateUrl: 'app/components/app.component.html',
  providers: [BridgeService],
  directives: [ROUTER_DIRECTIVES, AngularComponent]
})
@RouteConfig([
])
export class AppComponent {
  public viewContainerRef: ViewContainerRef;
  
  constructor(bridgeService: BridgeService, componentResolver: ComponentResolver, injector : Injector, viewContainerRef: ViewContainerRef) {
    bridgeService.registerRootComponent(componentResolver, injector, viewContainerRef);
  }
}
