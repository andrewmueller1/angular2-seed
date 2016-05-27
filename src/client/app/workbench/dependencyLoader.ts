import {FeaturesComponentContainer} from '../components/features/featuresComponentContainer';
import {HeadnoteComponentContainer} from '../components/headnote/headnoteComponentContainer';

export class DependencyLoader {
    public static load(namespaceContainer: any) {
        namespaceContainer.FeaturesComponentContainer = FeaturesComponentContainer;
        namespaceContainer.HeadnoteComponentContainer = HeadnoteComponentContainer;
    }
}