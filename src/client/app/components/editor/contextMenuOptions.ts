import * as Collections from 'typescript-collections';
import {TokenMetadataJW, SelectedTokenContainer} from './index';

export class ContextMenuOptions {
    /* SELECTION METADATA */
    public hasSelection: boolean;
    public containsPartialElements: boolean;

    /* MENU OPTIONS */
    // Selection
    public copySelection: boolean;
    public copySelectionMarkup: boolean;
    public deleteSelection: boolean;
    // Add XML
    public addBold: boolean;
    public addItal: boolean;
    public addWordphrase: boolean;
    // Edit XML
    public editCite: boolean
    // Remove XML
    public removeBold: boolean;
    public removeItal: boolean;
    public removeWordphrase: boolean;
    public removeCite: boolean;
    // Spell check.
    public showSpellingSugestions: boolean;
    public spellingSugestions: Array<string> = ['complete', 'completely', 'completed'];


    constructor(selectedTokenContainer: SelectedTokenContainer) {
        // Check Selection.
        if (selectedTokenContainer.start < selectedTokenContainer.end) {
            this.hasSelection = true;
        }

        this.containsPartialElements = selectedTokenContainer.containsPartialElements();

        // Check Bold.
        if (selectedTokenContainer.containsParent("bold")) {
            this.removeBold = true;
        } else if (this.hasSelection && !this.containsPartialElements) {
            this.addBold = true;
        }

        // Check Italicized.
        if (selectedTokenContainer.containsParent("ital")) {
            this.removeItal = true;
        } else if (this.hasSelection && !this.containsPartialElements) {
            this.addItal = true;
        }
        
        // Check Wordphrase.
        if (selectedTokenContainer.containsParent("wordphrase")) {
            this.removeWordphrase = true;
        } else if (this.hasSelection && !this.containsPartialElements) {
            this.addWordphrase = true;
        }

        // Check CiteQuery.
        if (selectedTokenContainer.containsParent("citequery")) {
            this.editCite = true;
            this.removeCite = true;
        }

        // Check for spelling option.
        if (!this.hasSelection && selectedTokenContainer.selectedTokens.length > 0 && selectedTokenContainer.selectedTokens[0].tokens.length > 0) {
            this.showSpellingSugestions = selectedTokenContainer.selectedTokens[0].tokens[0].type.indexOf('spell-error') > 0;
        }
    }
}