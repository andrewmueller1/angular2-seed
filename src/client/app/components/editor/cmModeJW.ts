﻿import {TokenMetadataCollection, TokenMetadataJW, TokenTypeJW} from './index';

export class CMModeJW implements CodeMirror.Mode<any> {
    private static xmlRegEx: RegExp = /<.[^<]*?>/;
    
    private tokenCount: number;
    private currentTokenParents :  Array<TokenMetadataJW>;
    private updateTokenMetadata: boolean;
    private updating: boolean;
    
    public tokenMetadataCollection: TokenMetadataCollection;
    

    constructor(options: any) {
        this.updateTokenMetadata = true;
    };
    
    public updateXml() {
        this.updateTokenMetadata = true;
    }

    // CodeMirror.Mode interface implementation.
    public startState() {
        this.tokenCount = 0;
        this.updateTokenMetadata = true;
        this.tokenMetadataCollection = new TokenMetadataCollection();
        this.currentTokenParents = new Array<TokenMetadataJW>();

        return this;
    };

    // CodeMirror.Mode interface implementation.
    public token(stream: CodeMirror.StringStream, state: CMModeJW) {
        var searchingStream = true;
        var endOfStream = false;

        while (searchingStream) {
            // Progress the stream or stop searching if we are at the end.
            if (!stream.next()) {
                searchingStream = false;
            }

            var current = stream.current();
            var search = current.search(CMModeJW.xmlRegEx);

            // Check for search results.
            if (search >= 0) {

                // If NOT 0 this match contains text leading upto an XML match.
                let match = current.match(CMModeJW.xmlRegEx)[0];
                if (search !== 0) {
                    // Back up the reader to exclude the XML match.
                    stream.backUp(match.length);
                    current = stream.current();
                } else {
                }

                searchingStream = false;
            }
            
            if(!stream.peek()) {
                endOfStream = true;
            }
        }
        
        // Only rebuild the token metadata collection when the XML structre of the content changes.
        var tokenMetadata: TokenMetadataJW;
        if (this.updating) {
            
            var tokenMetadata = new TokenMetadataJW(current, this.tokenCount);
            
            if (tokenMetadata.isXml) {
                if (tokenMetadata.type === TokenTypeJW.Close) {
                    this.currentTokenParents.pop();
                }

                tokenMetadata.addParents(this.currentTokenParents);

                if (tokenMetadata.type === TokenTypeJW.Open) {
                    this.currentTokenParents.push(tokenMetadata);
                }
            } else {
                tokenMetadata.addParents(this.currentTokenParents);
            }
            
            // Add new token metadata to collection.
            this.tokenMetadataCollection.addTokenMetadata(tokenMetadata);
        }

        if (endOfStream && this.updating) {
            this.updateTokenMetadata = false;
            this.updating = false;
        }
        
        if(!tokenMetadata) {
            tokenMetadata = this.tokenMetadataCollection.getTokenMetadata(this.tokenCount);
        }
        this.tokenCount++;
        
        // Check from structure change
        if(tokenMetadata.isXml && tokenMetadata.tokenString !== current) {
            this.updateXml();
        }
        // Update start and end metadata everytime as positions will change when any content is edited, even text.
        tokenMetadata.start = stream.pos - current.length;
        tokenMetadata.end = stream.pos;

        return tokenMetadata.toTokenTypeString();
    }
}

export class CMModeJWState {
    
}
