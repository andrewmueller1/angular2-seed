/// <reference path="../../../typings/globals/clipboard/index.d.ts" />
/// <reference path="../../../tools/manual_typings/project/codemirror.d.ts" />
/// <reference path="../../../tools/manual_typings/project/workbench.d.ts" />
import {APP_BASE_HREF} from '@angular/common';
import {ComponentRef, coreLoadAndBootstrap, createPlatform, enableProdMode, provide, ReflectiveInjector} from '@angular/core';
import {BROWSER_PROVIDERS} from '@angular/platform-browser';
import {BROWSER_APP_DYNAMIC_PROVIDERS} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {DependencyLoader} from './workbench/dependencyLoader';
import {CMBootstrapper} from './components/editor/index';
import {WidgetComponentFactory} from './workbench/widgetComponentFactory';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

var platform = createPlatform(ReflectiveInjector.resolveAndCreate([BROWSER_PROVIDERS]));
var appInjector = ReflectiveInjector.resolveAndCreate([BROWSER_APP_DYNAMIC_PROVIDERS, WidgetComponentFactory, provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })], platform.injector);

// Bootstrap NG2
coreLoadAndBootstrap(appInjector, AppComponent).then((componentRef: ComponentRef<AppComponent>) => {
  /*** START - BOOTSTRAP WORKBENCH ***/
  // TODO: Add this to JW params so it can be injected to WidgetComponentContainer's.
  var widgetComponentFactory: WidgetComponentFactory = appInjector.get(WidgetComponentFactory);
  (<any>window).widgetComponentFactory = widgetComponentFactory;
  // Load widgetComponentContainer classes used by WorkBench application.
  (<any>window).jwAngular = {};
  DependencyLoader.load((<any>window).jwAngular);
  // Load CodeMirror
  //CMBootstrapper.load();
  // Launch WorkBench.
  var main = document.getElementById('testMain');
  (<any>window).executeLoadAndLaunchChain(main);
  /*** STOP - BOOTSTRAP WORKBENCH ***/
})

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
