import {CMModeJW, CMEditorContainer} from './index';

export class CMBootstrapper {

    public static load() {
        /***    Define custom modes.     ***/
        // Factory method used by CodeMirror
        var customModeFactory: CodeMirror.ModeFactory<any> = function (config: CodeMirror.EditorConfiguration, modeOptions?: any) {
            return new CMModeJW(modeOptions);
        };
        CodeMirror.defineMode('judicialWorkbench', customModeFactory);
    }
}
