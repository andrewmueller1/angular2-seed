import {Component, Input} from 'angular2/core';
import {BridgeService, WorkBenchComponentWrapper} from './bridge.service';


@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'workbench-angular-component',
    templateUrl: 'app/workbench/angular.component.html'
})

export class AngularComponent {
    @Input() id: string; // Populated on componentWrapper template owned by the workbench code.
    private _bridgeService: BridgeService; // Provider registered on bootstrap that is injected from the singleton instance.
    private _componentWrapper: WorkBenchComponentWrapper; // Wrapper created by the bridge that is registerd with the workbench code.

    constructor(bridgeService: BridgeService) {
        this._bridgeService = bridgeService;
        // this._componentWrapper = bridgeService.subscribe(this.id);

        // // Register event handler with Workbench component wrapper
        // this._componentWrapper.observable.subscribe((value: any) => {
        //     this.eventHandler(value);
        // });
    }

    public eventHandler(eventData: any) {

    }
}
