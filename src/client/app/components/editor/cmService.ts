import {Injectable} from '@angular/core';
import * as Collections from 'typescript-collections';
import {CMModeJW, CMEditorContainer} from './index';

@Injectable()
export class CMService {
    private _editors: Collections.Dictionary<string, CMEditorContainer>;


    constructor() {
        this._editors = new Collections.Dictionary<string, CMEditorContainer>();
    }

    public addEditor(editorId: string, editorType: EditorType): CMEditorContainer {
        // Create editorContainer.
        var editorContainer = new CMEditorContainer(editorId, editorType);
        // Add to editors collection.
        this._editors.setValue(editorId, editorContainer);
        // Return new editor container.
        return editorContainer;
    }
    
    public getEditor(editorId: string) {
        return this._editors.getValue(editorId);
    }

    public removeEditor(editorId: string) {
        
        this._editors.remove(editorId);
    }
}

export enum EditorType {
    JudicialWorkbench,
    SpellCheck,
    XML
}
