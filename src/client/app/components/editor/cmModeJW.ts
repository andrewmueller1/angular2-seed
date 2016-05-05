import {TokenMetadataCollection, TokenMetadataJW, TokenTypeJW} from './index';

export class CMModeJW implements CodeMirror.Mode<any> {
    private static xmlRegEx: RegExp = /<.[^<]*?>/;

    private tokenCount: number;
    private currentTokenParents: Array<TokenMetadataJW>;
    public tokenMetadataCollection: TokenMetadataCollection;


    constructor(tokenMetadataCollection: TokenMetadataCollection) {
        this.tokenMetadataCollection = tokenMetadataCollection;
    };

    // CodeMirror.Mode interface implementation.
    public startState() {
        this.tokenMetadataCollection.clear();
        this.tokenCount = 0;
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

            if (!stream.peek()) {
                endOfStream = true;
            }
        }

        
        // Build token metadata collection with the current token metadata.
        // We do this whenever the editor is tokenized.
        var tokenMetadata = new TokenMetadataJW(this.tokenCount, current, stream.pos);

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
        this.tokenMetadataCollection.add(tokenMetadata);
        this.tokenCount++;

        return tokenMetadata.toTokenTypeString();
    }
}
