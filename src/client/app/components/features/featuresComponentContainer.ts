import {ComponentRef} from '@angular/core';
import {Type} from 'angular2/src/facade/lang';
import {Widget} from 'jw';
import {FeaturesComponent} from './features.component';
import {WidgetComponentContainer} from '../../workbench/widgetComponentContainer';

export class FeaturesComponentContainer extends WidgetComponentContainer {
    protected componentInstance : FeaturesComponent;
    
    constructor() {
        super(FeaturesComponent);
    }
    
    public setComponent(component : ComponentRef<FeaturesComponent>) {
        super.setComponent(component);
        this.componentInstance = this.component.instance;
        
        // Map widget => component Inputs.
        
        // Map component => widget Outputs.
        this.componentInstance.onInputKeyUp.subscribe((text: string) => {
            this.widget.pageController.publish("update", this.widget.id, { "text": text });
        });
    }
}

/// <reference path="../../tools/manual_typings/project/workbench.d.ts" />
namespace workTest {
    export class Test {
        public test() {
            return "blah";
        }
    }
}

