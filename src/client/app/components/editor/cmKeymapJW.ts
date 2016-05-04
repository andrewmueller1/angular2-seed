import * as Collections from 'typescript-collections';

export class CMKeymapJW {
    private static uneditableTokenTypes : Collections.LinkedList<string>;
    
    public fallthrough = 'default';

    public Up(cm: CodeMirror.Editor) {
        cm.execCommand('goLineUp');
        var currentToken = cm.getTokenAt(cm.getDoc().getCursor());
        var tokenType = CMKeymapJW.getTokenType(currentToken);
        if (tokenType === CodeMirrorModeTokenType.Xml) {
            var anchor = CMKeymapJW.move(cm, -1);
            cm.getDoc().setCursor(anchor);
        }
    };

    public Down(cm: CodeMirror.Editor) {
        cm.execCommand('goLineDown');
        var currentToken = cm.getTokenAt(cm.getDoc().getCursor());
        var tokenType = CMKeymapJW.getTokenType(currentToken);
        if (tokenType === CodeMirrorModeTokenType.Xml) {
            var anchor = CMKeymapJW.move(cm, -1);
            cm.getDoc().setCursor(anchor);
        }
    };

    public Left(cm: CodeMirror.Editor, curPos?: CodeMirror.Position) {
        if (!curPos) {
            curPos = cm.getDoc().getCursor();
        }

        var anchor = CMKeymapJW.move(cm, -1, curPos);
        if (anchor.ch >= 0) {
            cm.getDoc().setCursor(anchor);
        } else {
            cm.execCommand('goDocStart');
        }
    };

    public Right(cm: CodeMirror.Editor) {
        var anchor = CMKeymapJW.move(cm, 1);
        if (anchor.ch >= 0) {
            cm.getDoc().setCursor(anchor);
        } else {
            cm.execCommand('goDocEnd');
        }
    };

    public Backspace(cm: CodeMirror.Editor) {
        // Handle selection
        if (cm.getDoc().getSelection().length > 0) {
            cm.getDoc().listSelections();
            // Get all tokens.
            // Reset selection.
            // Select token ranges based on tokenType.
            return;
        }

        // Handle curser with no selection
        var anchor = CMKeymapJW.move(cm, -1);
        if (anchor.ch >= 0) {
            cm.getDoc().setCursor(anchor);
            cm.execCommand('delCharAfter');
        } else {
            cm.execCommand('goDocStart');
        }
    };

    public Delete(cm: CodeMirror.Editor) {
        var anchor = CMKeymapJW.move(cm, 1);
        if (anchor.ch >= 0) {
            cm.getDoc().setCursor(anchor);
            cm.execCommand('delCharBefore');
        } else {
            cm.execCommand('goDocEnd');
        }
    };

    // private static moveLine (cm: CodeMirror.Editor, moveValue: number) {
    //     var lineInfo = cm.lineInfo(0);
    //     lineInfo.te
    // }

    public static move(cm: CodeMirror.Editor, moveValue: number, curPos?: CodeMirror.Position): CodeMirror.Position {
        var verifiedTarget = false;
        if (!curPos) {
            curPos = cm.getDoc().getCursor();
        }

        while (!verifiedTarget) {
            var lineChDestination = curPos.ch + moveValue;
            if (lineChDestination < 0 || lineChDestination > cm.lineInfo(curPos.line).text.length) {
                curPos.line = curPos.line - 1;
            }

            var token = moveValue < 0 ? cm.getTokenAt(curPos) : cm.getTokenAt({ line: curPos.line, ch: curPos.ch + moveValue });
            var tokenType = CMKeymapJW.getTokenType(token);

            if (tokenType === CodeMirrorModeTokenType.Xml) {
                curPos.ch = moveValue < 0 ? token.start : token.end;
            } else if (tokenType === CodeMirrorModeTokenType.Text || tokenType === CodeMirrorModeTokenType.Unknown) {
                verifiedTarget = true;
            }

            if (!verifiedTarget && (curPos.ch === 0 || curPos.ch === cm.getDoc().getLine(curPos.line).length)) {
                verifiedTarget = true;
                return new CodeMirror.Pos(curPos.line, -1);
            }
        }

        return new CodeMirror.Pos(curPos.line, curPos.ch + moveValue);
    };

    private static getTokenType(token: CodeMirror.Token) {
        var tokenEnumType = CodeMirrorModeTokenType.Unknown;
        if (token.type) {
            token.type.split(' ').forEach((tokenType, index, array) => {
                if (tokenType === 'xml' || tokenType === 'cm-parent-citequery') {
                    tokenEnumType = CodeMirrorModeTokenType.Xml;
                    return;
                } else if (tokenType === 'text') {
                    tokenEnumType = CodeMirrorModeTokenType.Text;
                    return;
                }
            });
        }
        return tokenEnumType;
    };
}

export enum CodeMirrorModeTokenType {
    Xml,
    Close,
    Text,
    Unknown
}
