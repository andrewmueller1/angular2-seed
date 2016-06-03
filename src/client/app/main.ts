/// <reference path="../../../typings/globals/clipboard/index.d.ts" />
/// <reference path="../../../tools/manual_typings/project/codemirror.d.ts" />
/// <reference path="../../../tools/manual_typings/project/workbench.d.ts" />
import { APP_BASE_HREF, } from '@angular/common';
import {APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS, Type, enableProdMode, provide, ComponentFactory, ComponentResolver, ComponentRef, createPlatform, ReflectiveInjector, coreLoadAndBootstrap, coreBootstrap, ApplicationRef} from '@angular/core';
import {BROWSER_APP_COMMON_PROVIDERS} from '@angular/platform-browser';
//import {bootstrap, PL} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {AppComponent} from './app.component';
import {DependencyLoader} from './workbench/dependencyLoader';
import {CMBootstrapper} from './components/editor/index';
import {WidgetComponentFactory} from './workbench/widgetComponentFactory';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }
// Bootstrap CodeMirror
//CMBootstrapper.load();

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
var platform = createPlatform(ReflectiveInjector.resolveAndCreate([PLATFORM_COMMON_PROVIDERS]));
var appInjector = ReflectiveInjector.resolveAndCreate([APPLICATION_COMMON_PROVIDERS, WidgetComponentFactory, provide(APP_BASE_HREF, { useValue: '<%= APP_BASE %>' })], platform.injector);

// Load widgetComponentContainer classes used by WorkBench application.
(<any>window).jwAngular = {};
DependencyLoader.load((<any>window).jwAngular);

// TODO: Add this to JW params so it can be injected to WidgetComponentContainer's.
var widgetComponentFactory: WidgetComponentFactory = appInjector.get(WidgetComponentFactory);
(<any>window).widgetComponentFactory = widgetComponentFactory;

coreLoadAndBootstrap(appInjector, AppComponent).then((componentRef: ComponentRef<AppComponent>) => {
  // Bootstrap WorkBench.
  var main = document.getElementById('testMain');
  (<any>window).executeLoadAndLaunchChain(main);
})

// var componentResolver: ComponentResolver = appInjector.get(ComponentResolver);
// componentResolver.resolveComponent(AppComponent).then((componentFactory: ComponentFactory<AppComponent>) => {
//   // Bootstrap NG2.
//   coreLoadAndBootstrap()
//   coreBootstrap(appInjector, componentFactory);

//   // Bootstrap WorkBench.
//   var main = document.getElementById('testMain');
//   (<any>window).executeLoadAndLaunchChain(main);
// });

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
