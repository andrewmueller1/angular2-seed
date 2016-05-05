import {CMModeJW, EditorOptions} from './index';

export class CMBootstrapper {

    public static load() {
        /***    Define custom modes.     ***/
        // Factory method used by CodeMirror
        var customModeFactory: CodeMirror.ModeFactory<any> = function (config: EditorOptions, modeOptions?: any) {
            return new CMModeJW(config.editorTokens);
        };
        CodeMirror.defineMode('judicialWorkbench', customModeFactory);
    }
}
