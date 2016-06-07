import {TokenMetadataJW, TokenTypeJW} from './index';

export class TokenMetadataCollection {
    private collection: Array<TokenMetadataJW>;
    
    constructor() {
        this.collection = new Array<TokenMetadataJW>();
    }
    
    public add(tokenMetadata: TokenMetadataJW) {
        this.collection.push(tokenMetadata);
    }
    
    public contains(tokenId: number): boolean {
        if(this.collection && tokenId < this.collection.length && tokenId >= 0){
            return true;
        }
        return false;
    }
    
    public get(tokenId: number): TokenMetadataJW {
        if(this.collection && tokenId < this.collection.length && tokenId > 0) {
            return this.collection[tokenId];
        }
        // TODO: Log error.
        return null;
    }
    
    public clear() : void {
        this.collection = new Array<TokenMetadataJW>();
    }
    
    public first() : TokenMetadataJW {
        return this.collection[0];
    }
    
    public last() : TokenMetadataJW {
        return this.collection[this.collection.length - 1];
    }

    public getAtPosition(pos: CodeMirror.Position) {
        var tokenAtPosition: TokenMetadataJW;
        this.collection.forEach((tokenMetadata: TokenMetadataJW) => {
            if(pos.ch > tokenMetadata.start && pos.ch <= tokenMetadata.end) {
                tokenAtPosition = tokenMetadata;
                return;
            }
        });
        
        return tokenAtPosition;
    }
}
