import {PatentsComponent} from './patents.component';
import {WidgetComponentContainer} from '../../workbench/widgetComponentContainer';

export class PatentsComponentContainer extends WidgetComponentContainer<PatentsComponent>  {
    
    constructor(params: any) {
        super(params, PatentsComponent);
    }
    
    protected mapComponentToWidget() {
        super.mapComponentToWidget();
        // Map widget => component Inputs.
        // Map component => widget Outputs.
    }
}
