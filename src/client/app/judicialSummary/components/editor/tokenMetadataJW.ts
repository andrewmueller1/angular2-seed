import * as Collections from 'typescript-collections';

export class TokenMetadataJW {
    public tokenId: number;
    public tokenString: string;
    public type: TokenTypeJW;
    public isXml: boolean;
    public xmlTagName: string;
    public start: number;
    public end: number;
    
    private parents: Collections.LinkedList<TokenMetadataJW>;

    // TODO: Remove types list and implement getType() and isXML(). Save tokenString to comparison later to dynamically check if the xml structure has changed.
    constructor(tokenId: number, tokenString: string, streamPosition: number) {
        this.tokenId = tokenId;
        this.tokenString = tokenString;
        this.start = streamPosition - this.tokenString.length;
        this.end = streamPosition;
        
        // Initialize parents list;
        this.parents = new Collections.LinkedList<TokenMetadataJW>();

        // Parse the token string.
        // Check if this is XML
        if (tokenString[0] === '<') {
            var xmlTagNameStart = 1;
            var xmlTagNameEnd = tokenString.indexOf(' ');
            var isOpen = true;
            this.isXml = true;

            // Check if this is a closing tag.
            if (tokenString[1] === '/') {
                this.type = TokenTypeJW.Close;
                xmlTagNameStart = 2;
                isOpen = false;
            }

            // Check if this is a self closing tag.
            if (tokenString.length > 2 && (tokenString[tokenString.length - 2] === '/' || tokenString[tokenString.length - 2] === '?')) {
                this.type = TokenTypeJW.SelfClose;
                isOpen = false;
            }

            // Check if this is an open tag.
            if (isOpen) {
                this.type = TokenTypeJW.Open
            }

            // Determine the XML tag name.
            if (xmlTagNameEnd <= xmlTagNameStart) {
                xmlTagNameEnd = tokenString.indexOf('>');
            }

            this.xmlTagName = tokenString.substring(xmlTagNameStart, xmlTagNameEnd).replace('.', '');
        } else {
            this.type = TokenTypeJW.Text;
        }
    };

    public containsParent(parentName: string): boolean {
        var contains = false;
        this.parents.forEach((parent: TokenMetadataJW) => {
            if (parentName === parent.xmlTagName) {
                contains = true;
            }
        });

        return contains;
    };

    public addParents(parentTags: Array<TokenMetadataJW>) {
        // Build list of this tokens parent tags and convert them to enum values.
        parentTags.forEach((parent: TokenMetadataJW) => {
            this.parents.add(parent);
        });
    }
    
    public toTokenTypeString() {
        var tokenTypeString = 'id-' + this.tokenId;
        
        // Populate type with tag metadata.
        if(this.isXml) {
            tokenTypeString += ' xml tag-' + this.xmlTagName;
        } else {
            tokenTypeString += ' text';
        }

        // populate type with active parents.
        this.parents.forEach((parent: TokenMetadataJW) => {
            tokenTypeString += ' parent-' + parent.xmlTagName;
        });
        
        return tokenTypeString;
    }
    
    // // Populate XML hierachy data with the parentTags list to preserve the XML structure.
    // // This is to preserve the tree structure in the flat token list.
    // private addParents2(parentTags: Collections.LinkedList<string>) {
    //     // Build list of this tokens parent tags and convert them to enum values.
    //     parentTags.forEach((parent: string) => {
    //         switch (parent) {
    //             case 'paratext':
    //                 this.parents.add(ParentTypesJW.Paratext);
    //                 break;
    //             case 'cite.query':
    //                 this.parents.add(ParentTypesJW.CiteQuery);
    //                 break;
    //             case 'ital':
    //                 this.parents.add(ParentTypesJW.Ital);
    //                 break;
    //             case 'bold':
    //                 this.parents.add(ParentTypesJW.Bold);
    //                 break;
    //             default:
    //                 this.parents.add(ParentTypesJW.Unknown);
    //                 break;
    //         }
    //     });
    // }

    // public static buildTokenMetadataCollection(cm: CodeMirror.Editor): Collections.Dictionary<string, TokenMetadataJW> {
    //     var tokens = Array<CodeMirror.Token>();
    //     for (var i = 0; i < cm.getDoc().lineCount(); i++) {
    //         tokens = tokens.concat(cm.getLineTokens(i));
    //     }

    //     var tokenMetadataCollection = new Collections.Dictionary<string, TokenMetadataJW>();
    //     var parentTags = new Collections.LinkedList<string>();
        
    //     tokens.forEach((token: CodeMirror.Token, index: number) => {
    //         // Get cmTokenId we generated to map this metadata to the DOM.
    //         var tokenId = parseInt(token.type.substr(0, token.type.indexOf(' ')));
    //         var tokenMetadata = new TokenMetadataJW(token.string,tokenId);
            
    //         if (tokenMetadata.containsType(TokenTypeJW.Xml)) {
    //             if (tokenMetadata.containsType(TokenTypeJW.Close)) {
    //                 parentTags.remove(parentTags.last());
    //             }

    //             tokenMetadata.addParents(parentTags);

    //             if (tokenMetadata.containsType(TokenTypeJW.Open)) {
    //                 parentTags.add(tokenMetadata.xmlTagName);
    //             }
    //         } else {
    //             tokenMetadata.addParents(parentTags);
    //         }

    //         tokenMetadataCollection.setValue(token.type, tokenMetadata);
    //     });
    //     return tokenMetadataCollection;
    // }
}

export enum ParentTypesJW {
    Paratext,
    CiteQuery,
    Ital,
    Bold,
    Unknown
}

export enum TokenTypeJW {
    Xml,
    XmlName,
    Close,
    SelfClose,
    Open,
    Text,
    Unknown,
    Parent
}
