import {FeaturesComponentContainer} from '../judicialSummary/components/features/featuresComponentContainer';
import {HeadnoteComponentContainer} from '../judicialSummary/components/headnote/headnoteComponentContainer';
import {PatentsComponentContainer} from '../judicialSummary/components/patents/patentsComponentContainer';

export class DependencyLoader {
    public static load(namespaceContainer: any) {
        namespaceContainer.FeaturesComponentContainer = FeaturesComponentContainer;
        namespaceContainer.HeadnoteComponentContainer = HeadnoteComponentContainer;
        namespaceContainer.PatentsComponentContainer = PatentsComponentContainer;
    }
}