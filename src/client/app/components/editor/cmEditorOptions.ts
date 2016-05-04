import {Injectable} from 'angular2/core';
import {EditorType} from './index';

@Injectable()
export class CMEditorOptions {
    public static getOptions(editorType: EditorType): EditorOptions {
        var options: EditorOptions = {
            lineNumbers: false,
            lineWrapping: true,

        };

        switch (editorType) {
            case EditorType.JudicialWorkbench:
                options.showCursorWhenSelecting = false;
                options.mode = { name: 'judicialWorkbench', json: true };
                options.dragDrop = false;
                options.undoDepth = 5;
                break;
            case EditorType.XML:
                options.mode = 'text/html';
                break;
            case EditorType.SpellCheck:
                options.mode = 'spell-checker';
                options.backdrop = 'judicialWorkbench';
                break;
        }
        return options;
    }
}

interface EditorOptions extends CodeMirror.EditorConfiguration {
    backdrop?: string;
    inputStyle?: string;
}
