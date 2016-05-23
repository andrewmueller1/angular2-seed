/// <reference path="../../typings/browser/ambient/clipboard/index.d.ts" />
/// <reference path="../../tools/manual_typings/project/codemirror.d.ts" />
/// <reference path="../../tools/manual_typings/project/workbench.d.ts" />
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode, provide, ComponentResolver, ComponentRef} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
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
]).then((cmpRef: ComponentRef<AppComponent>) => {
  /*** Build bridge service for WorkBench integration. ***/
  
  // Resolve widgetComponentContainerFactory dependencies.
  var componentResolver = cmpRef.injector.get(ComponentResolver);
  var injector = cmpRef.injector;
  var widgetComponentContainerFactory = new WidgetComponentContainerFactory(componentResolver, injector);
  
  // Set the bridge service as a global singleton.
  (<any>window).bridge = new BridgeService(widgetComponentContainerFactory);
  
  // Bootstrap workbench.
  var main = document.getElementById('main');
  (<any>window).executeLoadAndLaunchChain(main);
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
