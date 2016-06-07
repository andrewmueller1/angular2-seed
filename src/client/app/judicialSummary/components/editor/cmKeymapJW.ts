import {TokenMetadataCollection} from './index';

export class CMKeymapJW {
    private editorTokens: TokenMetadataCollection;

    constructor(editorTokens: TokenMetadataCollection) {
        this.editorTokens = editorTokens;
    }

    public fallthrough = 'default';

    public Up(cm: CodeMirror.Editor) {
        cm.execCommand('goLineUp');
        var editorTokens = CMKeymapJW.editorTokens(cm);
        var anchor = cm.getDoc().getCursor();
        var token = editorTokens.getAtPosition(anchor);

        if (token.isXml) {
            // TODO: Determine right or left movement dynamically based on distance to start or end of xml tag.
            var moveInfo = CMKeymapJW.move(editorTokens, -1, anchor);
            cm.getDoc().setCursor(moveInfo.postion);
        }
    };

    public Down(cm: CodeMirror.Editor) {
        cm.execCommand('goLineDown');
        var editorTokens = CMKeymapJW.editorTokens(cm);
        var anchor = cm.getDoc().getCursor();
        var token = editorTokens.getAtPosition(anchor);

        if (token.isXml) {
            // TODO: Determine right or left movement dynamically based on distance to start or end of xml tag.
            var moveInfo = CMKeymapJW.move(editorTokens, -1, anchor);
            cm.getDoc().setCursor(moveInfo.postion);
        }
    };

    public Left(cm: CodeMirror.Editor) {
        var editorTokens = CMKeymapJW.editorTokens(cm);

        var moveInfo = CMKeymapJW.move(editorTokens, -1, cm.getDoc().getCursor());
        cm.getDoc().setCursor(moveInfo.postion);
    };

    public Right(cm: CodeMirror.Editor) {
        var editorTokens = CMKeymapJW.editorTokens(cm);

        var moveInfo = CMKeymapJW.move(editorTokens, 1, cm.getDoc().getCursor());
        cm.getDoc().setCursor(moveInfo.postion);
    };

    public Backspace(cm: CodeMirror.Editor) {
        var editorTokens = CMKeymapJW.editorTokens(cm);

        var moveInfo = CMKeymapJW.move(editorTokens, -1, cm.getDoc().getCursor());
        if (moveInfo.canEdit) {
            cm.getDoc().setCursor(moveInfo.postion);
            cm.execCommand('delCharAfter');
        }
    };

    public Delete(cm: CodeMirror.Editor) {
        var editorTokens = CMKeymapJW.editorTokens(cm);

        var moveInfo = CMKeymapJW.move(editorTokens, 1, cm.getDoc().getCursor());
        if (moveInfo.canEdit) {
            cm.getDoc().setCursor(moveInfo.postion);
            cm.execCommand('delCharBefore');
        }
    };

    public static move(editorTokens: TokenMetadataCollection, moveValue: number, curPos: CodeMirror.Position): MoveInfo {
        var verifiedTarget = false;
        var moveInfo = new MoveInfo();

        // TODO: Possibly need to handle lines.

        while (!verifiedTarget) {
            var token = moveValue < 0 ? editorTokens.getAtPosition(curPos) : editorTokens.getAtPosition({ line: curPos.line, ch: curPos.ch + moveValue });

            if (token && token.isXml) {
                curPos.ch = moveValue < 0 ? token.start : token.end;
            } else if (token) {
                verifiedTarget = true;
                moveInfo.canEdit = true;
            } else if (moveValue < 0) {
                verifiedTarget = true;
                curPos.ch = editorTokens.first().end + 1;
            } else {
                verifiedTarget = true;
                curPos.ch = editorTokens.last().start - 1;
            }
        }

        moveInfo.postion = new CodeMirror.Pos(curPos.line, curPos.ch + moveValue);
        return moveInfo;
    };

    private static editorTokens(cm: CodeMirror.Editor): TokenMetadataCollection {
        return <TokenMetadataCollection>cm.getOption('editorTokens');
    }
}

class MoveInfo {
    public postion: CodeMirror.Position;
    public canEdit: boolean = false;
}
