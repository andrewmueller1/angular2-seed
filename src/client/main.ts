/// <reference path="../../typings/browser/ambient/clipboard/index.d.ts" />
/// <reference path="../../tools/manual_typings/project/codemirror.d.ts" />
/// <reference path="../../tools/manual_typings/project/workbench.d.ts" />
import {provide, enableProdMode, PlatformRef, ComponentResolver, ViewContainerRef} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app/components/app.component';
import {BridgeService} from './app/workbench/bridge.service';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })
]).then((cmpRef: any) => {
  var bridgeService = cmpRef.injector.get(BridgeService);
  WorkBench.registerBridge(bridgeService);
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
