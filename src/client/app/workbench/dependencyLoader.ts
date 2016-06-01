import {FeaturesComponentContainer} from '../components/features/featuresComponentContainer';
import {HeadnoteComponentContainer} from '../components/headnote/headnoteComponentContainer';
import {PatentsComponentContainer} from '../components/patents/patentsComponentContainer';

export class DependencyLoader {
    public static load(namespaceContainer: any) {
        namespaceContainer.FeaturesComponentContainer = FeaturesComponentContainer;
        namespaceContainer.HeadnoteComponentContainer = HeadnoteComponentContainer;
        namespaceContainer.PatentsComponentContainer = PatentsComponentContainer;
    }
}