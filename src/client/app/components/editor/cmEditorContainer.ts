import {Subject} from 'rxjs/Rx';
import * as Collections from 'typescript-collections';
import {CMEditorOptions, CMKeymapJW, CMModeJW, TokenMetadataJW, ContextMenuOptions, EditorType, SelectedTokenContainer, SelectedToken, TokenTypeJW} from './index';

export class CMEditorContainer {
    public cm: CodeMirror.Editor;
    public showContextmenu: Subject<{ event: MouseEvent, options: ContextMenuOptions }>;

    private editorId: string;
    private editorType: EditorType;
    private mode: CMModeJW;
    private selectedTokens: SelectedTokenContainer;

    constructor(editorId: string, editorType: EditorType) {
        this.editorId = editorId;
        this.editorType = editorType;
        this.showContextmenu = new Subject<{ event: MouseEvent, options: ContextMenuOptions }>();
    };

    public loadEditor() {
        var textArea = <HTMLTextAreaElement>document.getElementById(this.editorId);
        var options = CMEditorOptions.getOptions(this.editorType);
        this.cm = CodeMirror.fromTextArea(textArea, options);

        // Add custom keymap.
        if (this.editorType === EditorType.JudicialWorkbench || this.editorType === EditorType.SpellCheck) {
            var keyMap = CodeMirror.normalizeKeyMap(new CMKeymapJW());
            this.cm.addKeyMap(new CMKeymapJW());
        }

        this.mode = this.cm.getDoc().getMode();
        if (this.editorType === EditorType.SpellCheck) {
            this.mode = this.cm.getDoc().getMode().startState().base;
        }
    }

    public mousedown(event: MouseEvent) {
        if (this.selectedTokens) {
            //this.selectedTokens.destroy();
        }

        //this.selectedTokens = new SelectedTokenContainer(this.cm, this.mode);
    }

    public contextmenu(event: MouseEvent) {
        this.mousedown(event);
        if (this.selectedTokens.selectedTokens.length > 0) {
            var menuOptions = new ContextMenuOptions(this.selectedTokens);
            this.showContextmenu.next({ 'event': event, 'options': menuOptions });
        }
    };

    public addXml(xmlTagName: string) {
        var currentValue = this.cm.getValue();
        var beforeRangeValue = currentValue.substring(0, this.selectedTokens.start);
        var rangeValue = currentValue.substring(this.selectedTokens.start, this.selectedTokens.end);
        var afterRangeValue = currentValue.substring(this.selectedTokens.end);
        
        // Handle open partial tags.
        var openPartials = this.selectedTokens.getPartialTags(true);
        var newOpenPartialOpenTags = '';
        var newOpenPartialCloseTags = '';
        openPartials.forEach((tokenMetadata: TokenMetadataJW) => {
            newOpenPartialCloseTags = this.toTag(tokenMetadata.xmlTagName, false) + newOpenPartialCloseTags;
            newOpenPartialOpenTags = newOpenPartialOpenTags + this.toTag(tokenMetadata.xmlTagName, true);
        });
        rangeValue = rangeValue + newOpenPartialCloseTags;
        afterRangeValue = newOpenPartialOpenTags + afterRangeValue;
        
        // Handle close partial tags.
        var closePartials = this.selectedTokens.getPartialTags(false);
        var newClosePartialOpenTags = '';
        var newClosePartialCloseTags = '';
        closePartials.forEach((tokenMetadata: TokenMetadataJW) => {
            newClosePartialCloseTags = this.toTag(tokenMetadata.xmlTagName, false) + newClosePartialCloseTags;
            newClosePartialOpenTags = newClosePartialOpenTags + this.toTag(tokenMetadata.xmlTagName, true);
        });
        rangeValue = newClosePartialOpenTags + rangeValue;
        beforeRangeValue = beforeRangeValue + newClosePartialCloseTags;

        var newValue = beforeRangeValue+ this.toTag(xmlTagName, true) + rangeValue + this.toTag(xmlTagName, false)  + afterRangeValue;
        this.updateEditorValue(newValue);
    }

    public removeXml(xmlTagName: string, removeContent?: boolean) {
        var selectedTokens = this.selectedTokens;

        // The tags we will remove from the editor content.
        var openTag: TokenMetadataJW;
        var closeTag: TokenMetadataJW;

        // Step 1: Find a open or close tag to remove.
        if (selectedTokens.selectedTokens.length === 1) { // Handles no selection.
            openTag = this.findCorrespondingTag(xmlTagName, selectedTokens.selectedTokens[0].id, false);
        } else { // Handles selection.
            selectedTokens.selectedTokens.forEach((selectedToken: SelectedToken) => {
                var tokenMetadata = selectedToken.metadata;
                if (tokenMetadata.isXml && tokenMetadata.xmlTagName === xmlTagName) {
                    if (tokenMetadata.type === TokenTypeJW.Open) {
                        openTag = tokenMetadata;
                    } else if (tokenMetadata.type === TokenTypeJW.Close) {
                        closeTag = tokenMetadata;
                    }
                    return;
                }
            });
        }

        // Step 2: Find the corresponding tag of the tag we identified in step 1.
        if (openTag) {
            closeTag = this.findCorrespondingTag(xmlTagName, openTag.tokenId, true);
        } else {
            openTag = this.findCorrespondingTag(xmlTagName, closeTag.tokenId, false);
        }

        // Step 3: Remove the tags from the editor content.
        var currentValue = this.cm.getValue();
        var newValue = currentValue.substring(0, openTag.start) + currentValue.substring(openTag.end, closeTag.start) + currentValue.substring(closeTag.end);
        this.updateEditorValue(newValue);
    }

    public linkEditor(editor: CMEditorContainer) {
        var mode = 'text/html';
        if (editor.editorType === EditorType.SpellCheck) {
            mode = 'spell-checker';
        }

        var doc = this.cm.getDoc().linkedDoc({ sharedHist: true, mode: mode });
        editor.cm.swapDoc(doc);
    }

    private findCorrespondingTag(xmlTagName: string, tokenId: number, findCloseTag: boolean): TokenMetadataJW {
        // Determine what direction we are searching.
        var tokenDirection = findCloseTag === true ? 1 : -1;
        var nextTokenId = tokenId + tokenDirection;

        while (true) {
            // Break if we have no more tokens to check.
            if (!this.mode.tokenMetadataCollection.containsTokenMetadata(nextTokenId)) {
                // TODO: Log error - If this happens malformed XML was sent to the editor.
                return null;
            }

            // Check the next token.
            var tokenMetadata = this.mode.tokenMetadataCollection.getTokenMetadata(nextTokenId);
            if (tokenMetadata.xmlTagName === xmlTagName) {
                // Check for close tag.
                if (findCloseTag && tokenMetadata.type === TokenTypeJW.Close) {
                    return tokenMetadata;
                }
                // Check for open tag.
                if (!findCloseTag && tokenMetadata.type === TokenTypeJW.Open) {
                    return tokenMetadata;
                }
            }

            // Increment to next token
            nextTokenId += tokenDirection;
        }
    }

    private updateEditorValue(newValue: string) {
        this.mode.updateXml();
        this.cm.setValue(newValue);
    }
    
    private toTag(xmlTagName: string, open: boolean) : string {
        if(open) {
            return  '<' + xmlTagName + '>';
        }
        
        return '</' + xmlTagName + '>';
    }

    private getEditorCoordsFromMouse(event: MouseEvent): CodeMirror.Position {
        return this.cm.coordsChar({ left: event.clientX, top: event.clientY });
    }
}
