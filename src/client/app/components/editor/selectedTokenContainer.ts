import * as Collections from 'typescript-collections';
import {CMModeJW, TokenMetadataJW, TokenTypeJW} from './index';

export class SelectedTokenContainer {
    public start: number;
    public end: number;
    public selectedTokens: Array<SelectedToken>;

    constructor(cm: CodeMirror.Editor, mode: CMModeJW, start?: number, end?: number) {
        var tokens = new Array<CodeMirror.Token>();

        // Determine start of selection.
        if ((!start || !end) && start != 0) {
            var selections = cm.getDoc().listSelections();
            this.start = selections[0].anchor.ch;
            this.end = selections[0].head.ch;
            if (selections[0].anchor.ch > selections[0].head.ch) {
                this.start = selections[0].head.ch;
                this.end = selections[0].anchor.ch;
            }
        } else {
            this.start = start;
            this.end = end;
        }

        // Get all tokens in the selected range.
        var tokens = new Array<CodeMirror.Token>();
        var rangePos = new CodeMirror.Pos(0, this.start);
        while (rangePos.ch <= this.end) {
            var token = cm.getTokenAt(rangePos);
            rangePos.ch = token.end + 1;
            if (token.type) {
                tokens.push(token);
            }
        }

        // Map tokens into structured XML metadata buckets for processing.
        this.selectedTokens = new Array<SelectedToken>();
        tokens.forEach((token: CodeMirror.Token) => {
            // Get token id.
            var tokenId = parseInt(token.type.substring(3, token.type.indexOf(' ')));

            // Check if we haven't already added the metadata for this token.
            var selectedTokenContainerIndex = this.indexOfTokenMetadata(tokenId);
            if (selectedTokenContainerIndex < 0) {
                // Add the selectedToken container with the appropriate metadata for this token.
                var selectedTokenMetadata = mode.tokenMetadataCollection.get(tokenId);
                selectedTokenContainerIndex = this.selectedTokens.length;
                this.selectedTokens.push(new SelectedToken(selectedTokenMetadata));
            }

            // Container we will add the token data to.  
            var selectedTokenContainer = this.selectedTokens[selectedTokenContainerIndex];
            // Add this token to it's corresponding "SelectedToken" container.
            selectedTokenContainer.tokens.push(token);
        });
    }

    public containsParent(parentName: string): boolean {
        var contains = false;
        this.selectedTokens.forEach((selectedToken: SelectedToken) => {
            if (selectedToken.metadata.containsParent(parentName)) {
                contains = true;
                return;
            }

        });

        return contains;
    };

    public containsPartialElements(): boolean {
        var containsPartials = false;

        return containsPartials;
    };
    
    public getPartialTags(checkOpen: boolean) {
        var selectedTokens = this.selectedTokens;
        var partialTags = Array<TokenMetadataJW>();
        
        // Verify we haven't selected partial XML elements.
        selectedTokens.forEach((selectedToken: SelectedToken) => {
            var tokenMetadata = selectedToken.metadata;

            if (tokenMetadata.isXml) {
                if(tokenMetadata.type === TokenTypeJW.Open) {
                    if(checkOpen) {
                        partialTags.push(tokenMetadata);
                    } else {
                        partialTags.pop();
                    }
                }
                if(tokenMetadata.type === TokenTypeJW.Close) {
                    if(checkOpen) {
                        partialTags.pop();
                    } else {
                        partialTags.push(tokenMetadata);
                    }
                }
            }
        });
        
        return partialTags;
    }

    private indexOfTokenMetadata(id: number) {
        var matchIndex = -1;
        this.selectedTokens.forEach((selectedToken: SelectedToken, index: number) => {
            if (selectedToken.id === id) {
                matchIndex = index;
                return;
            }

        });
        return matchIndex;
    }
}

export class SelectedToken {
    public id: number;
    public metadata: TokenMetadataJW;
    public tokens: Array<CodeMirror.Token>;

    constructor(metadata: TokenMetadataJW) {
        this.id = metadata.tokenId
        this.metadata = metadata;
        this.tokens = new Array<CodeMirror.Token>();
    }
}