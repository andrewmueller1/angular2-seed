import {Injector, Injectable, ComponentResolver, ComponentFactory} from 'angular2/core';
import {Type} from 'angular2/src/facade/lang';
import {Observable} from 'rxjs/Rx';
import {FeaturesComponent} from '../components/features/features.component';
import {HeadnoteComponent} from '../components/headnote/headnote.component';
import {MetadataPanelComponent} from '../components/metadataPanel/metadataPanel.component';
import {EditorComponent} from '../components/editor/components/editor.component';
import {WidgetComponentContainerFactory} from './widgetComponentContainerFactory';

@Injectable()
export class BridgeService {
    private widgetComponentContainerFactory : WidgetComponentContainerFactory;

    constructor(widgetComponentContainerFactory : WidgetComponentContainerFactory) {
        this.widgetComponentContainerFactory = widgetComponentContainerFactory;
    }

    public addComponent(componentName: string, widget: jw.Widget) {
        var observable = this.widgetComponentContainerFactory.create(componentName, widget);
        observable.subscribe((widgetComponentContainer : any) => {
            widget.widgetComponentContainer = widgetComponentContainer;
        });
        return observable;
    }
}