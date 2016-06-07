import {HeadnoteComponent} from './headnote.component';
import {WidgetComponentContainer} from '../../../judicialWorkbench/index';

export class HeadnoteComponentContainer extends WidgetComponentContainer<HeadnoteComponent>  {
    
    constructor(params: any) {
        super(params, HeadnoteComponent);
    }
    
    protected mapComponentToWidget() {
        super.mapComponentToWidget();
        // Map widget => component Inputs.
        this.pageController.subscribe("refresh", this.id, (data: jw.EventData) => {
            this.component.instance.text = data.publisherData.text;
            this.component.changeDetectorRef.detectChanges();
        });
        
        // Map component => widget Outputs.
    }
}
