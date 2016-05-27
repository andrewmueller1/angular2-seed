import {Injectable} from '@angular/core';
import * as Collections from 'typescript-collections';

@Injectable()
export class CMStyleServiceJW {
    private styleContainers: Collections.Dictionary<string, CMStyleContainer>;

    constructor() {
        this.styleContainers = new Collections.Dictionary<string, CMStyleContainer>();
    }

    public addStyle(editorId: string): CMStyleContainer {
        var styleContainer = new CMStyleContainer(editorId);
        // styleContainer.addStyle();
        // this.styleContainers.setValue(editorId, styleContainer);
        return styleContainer;
    }

    public removeStyle(editorId: string) {
        var styleContainer = this.styleContainers.getValue(editorId);
        styleContainer.removeStyle();
        this.styleContainers.remove(editorId);
    }

    private getStyleContainer(editorId: string): CMStyleContainer {
        return this.styleContainers.getValue(editorId);
    }
}

export class CMStyleContainer {
    public editorId: string;
    private styleId: string;
    private styleSheet: CSSStyleSheet;
    private styleRules: Collections.Dictionary<StyleRules, number>;

    constructor(editorId: string) {
        this.editorId = editorId;
        this.styleId = editorId + '_style';
        this.styleRules = new Collections.Dictionary<StyleRules, number>();
    }

    public addStyle() {
        // Add style container to DOM.
        var styleElement = <HTMLStyleElement>document.createElement('style');
        styleElement.id = this.styleId;
        document.head.appendChild(styleElement);
        this.styleSheet = <CSSStyleSheet>styleElement.sheet;
        this.addRules();
    }

    public removeStyle() {

    }

    public showXml(show: boolean) {
        var rule = <CSSStyleRule>this.styleSheet.rules.item(this.styleRules.getValue(StyleRules.Xml));
        if (show) {
            rule.style.display = '';
        } else {
            rule.style.display = 'none';
        }
    }

    private addRules() {
        this.styleSheet.insertRule('#' + this.editorId + '_container .cm-xml { }');
        this.styleRules.setValue(StyleRules.Xml, 0);
    }
}

enum StyleRules {
    Xml
}
