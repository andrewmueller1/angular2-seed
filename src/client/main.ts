/// <reference path="../../typings/browser/ambient/clipboard/index.d.ts" />
/// <reference path="../../tools/manual_typings/project/codemirror.d.ts" />
/// <reference path="../../tools/manual_typings/project/workbench.d.ts" />
import {provide, enableProdMode, PlatformRef, ComponentResolver, ComponentRef} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {APP_BASE_HREF} from 'angular2/platform/common';
import {AppComponent} from './app/components/app.component';
import {BridgeService} from './app/workbench/bridge.service';
import {CMBootstrapper} from './app/components/editor/index';
import {WidgetComponentContainerFactory} from './app/workbench/widgetComponentContainerFactory';


if ('<%= ENV %>' === 'prod') { enableProdMode(); }
// Bootstrap CodeMirror
//CMBootstrapper.load();

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
]).then((cmpRef: ComponentRef) => {
  /*** Build bridge service for WorkBench integration. ***/
  
  // Resolve widgetComponentContainerFactory dependencies.
  var componentResolver = cmpRef.injector.get(ComponentResolver);
  var injector = cmpRef.injector;
  var widgetComponentContainerFactory = new WidgetComponentContainerFactory(componentResolver, injector);
  
  // Set the bridge service as a global singleton.
  (<any>window).bridge = new BridgeService(widgetComponentContainerFactory);
});

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }
