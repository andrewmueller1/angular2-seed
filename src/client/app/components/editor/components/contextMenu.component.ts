import {Component, HostListener, Input} from 'angular2/core';
import {CMEditorContainer, CMService, ContextMenuOptions} from '../index';

@Component({
    // Declare the tag name in index.html to where the component attaches
    selector: 'editor-context-menu-holder',
    templateUrl: 'app/components/editor/components/contextMenu.component.html',
    styleUrls: ['app/components/editor/components/contextMenu.component.css'],
    inputs: ['editorId']
})

export class ContextMenuComponent {
    private _codeMirrorService: CMService;
    private editorId: string;
    private editorContainer: CMEditorContainer;
    private isShown = false;
    private mouseLocation: { left: number, top: number } = { left: 0, top: 0 };
    private contextMenuOptions: any | ContextMenuOptions;

    constructor(codeMirrorService: CMService) {
        this._codeMirrorService = codeMirrorService;
        this.contextMenuOptions = {};
    }

    ngAfterViewChecked() {
        if (!this.editorContainer) {
            this.editorContainer = this._codeMirrorService.getEditor(this.editorId);
            this.editorContainer.showContextmenu.subscribe(e => this.showMenu(e.event, e.options));
            var blah = new Clipboard('#copyText', {
                text: (element: Element) => {
                    return 'blah';
                }
            });
        }

    }

    // show the menu and set the location of the mouse
    public showMenu(event: MouseEvent, options: ContextMenuOptions) {
        this.isShown = true;
        this.mouseLocation = {
            left: event.clientX,
            top: event.clientY
        };
        this.contextMenuOptions = options;
    };

    @HostListener('document:click', [])
    public clickedOutside() {
        this.isShown = false; // hide the menu
    };

    private get locationCss() {
        return {
            'position': 'fixed',
            'display': this.isShown ? 'block' : 'none',
            'left': this.mouseLocation.left + 'px',
            'top': this.mouseLocation.top + 'px'
        };
    };
    
    public addXmlContent(xmlTagName: string) {
        this.editorContainer.addXml(xmlTagName);
    }
    
    public removeXmlContent(xmlTagName: string, removeContent: boolean) {
        this.editorContainer.removeXml(xmlTagName, removeContent);
    }
}
