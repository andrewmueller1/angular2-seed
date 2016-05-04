import {TokenMetadataJW, TokenTypeJW} from './index';

export class TokenMetadataCollection {
    private collection: Array<TokenMetadataJW>;
    
    constructor(){}
    
    public containsTokenMetadata(tokenId: number): boolean {
        if(tokenId < this.collection.length && tokenId >= 0){
            return true;
        }
        return false;
    }
    
    public getTokenMetadata(tokenId: number): TokenMetadataJW {
        return this.collection[tokenId];
    }
    
    public addTokenMetadata(tokenMetadata: TokenMetadataJW) {
        this.collection.push(tokenMetadata);
    }
    
    public getTokenMetadataAt(pos: CodeMirror.Position) {
        var tokenAtPosition: TokenMetadataJW;
        this.collection.forEach((tokenMetadata: TokenMetadataJW) => {
            if(pos.ch >= tokenMetadata.start && pos.ch <= tokenMetadata.end) {
                tokenAtPosition = tokenMetadata;
                return;
            }
        });
        
        return tokenAtPosition;
    }
}
