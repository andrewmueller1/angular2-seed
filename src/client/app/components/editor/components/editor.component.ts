import {Component, AfterViewInit} from 'angular2/core';
import {CMService, ContextMenuComponent, EditorType, CMStyleServiceJW, CMStyleContainer, CMEditorContainer} from '../index';


@Component({
    directives: [ContextMenuComponent],
    // Declare the tag name in index.html to where the component attaches
    selector: 'jw-editor',
    viewProviders: [CMService, CMStyleServiceJW],
    templateUrl: 'app/components/editor/components/editor.component.html',
    styleUrls: ['app/components/editor/components/editor.component.css']
})

export class EditorComponent implements AfterViewInit {
    // Injected dependencies.
    private _codeMirrorService: CMService;
    private _styleService: CMStyleServiceJW;

    private editorId: string;
    private initialContent: string;
    private styleContainer: CMStyleContainer;
    private editorContainer: CMEditorContainer;;
    // Demo
    private xmlEditorId: string;
    private xmlEditorContainer: CMEditorContainer;;

    constructor(codeMirrorService: CMService, styleService: CMStyleServiceJW) {
        this._codeMirrorService = codeMirrorService;
        this._styleService = styleService;

        // Generate id for the editor.
        this.editorId = 'jwEditor_' + Math.floor(Math.random() * (10000 * 10000));;
        this.xmlEditorId = 'xml_' + this.editorId;

        // load editor with id.
        this.editorContainer = this._codeMirrorService.addEditor(this.editorId, EditorType.SpellCheck);
        this.xmlEditorContainer = this._codeMirrorService.addEditor(this.xmlEditorId, EditorType.XML);

        // Add styles
        this.styleContainer = this._styleService.addStyle(this.editorId);

        // Load content
        // this.initialContent = `<?xml version="1.0" encoding="UTF-8"?><n-load xsi:schemaLocation="http://www.thomsonreuters.com/legal/judicialdocs http://test.judicialsummary.judicial.int.westgroup.com/JudicialSummary/resources/schema/judicial.summary.service.schema-v4.0.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.thomsonreuters.com/legal/judicialdocs"><n-document guid="Ia16474d21d3311e4b4bafa136b480ad2"><n-metadata><summary.metadata><summaryArtifactUUID>Ia16474d21d3311e4b4bafa136b480ad2</summaryArtifactUUID><subjectArtifactUUID>Ia4d11ea53e4511e2a531ef6793d44951</subjectArtifactUUID><summarySetVersion>-1</summarySetVersion><summaryNumber>1</summaryNumber><summaryRank>1</summaryRank><artifactDescriptor artifactDescriptorId="40040"><activeFlag>true</activeFlag><artifactGroup artifactGroupId="4"><artifactGroupDesc>Summary</artifactGroupDesc></artifactGroup><artifactType artifactTypeId="4010"><activeFlag>true</activeFlag><artifactTypeDesc>Headnote</artifactTypeDesc></artifactType><artifactSubtype artifactSubtypeId="40040"><activeFlag>true</activeFlag><artifactSubtypeDesc>Non-Official TR Headnote</artifactSubtypeDesc></artifactSubtype></artifactDescriptor><health healthId="40" activeHealthFlag="true">INCOMPLETE</health><healthReason healthReasonId="120" activeReasonFlag="true"><description>Writing Not Finished</description><health healthId="40" activeHealthFlag="true">INCOMPLETE</health></healthReason><languageID>1</languageID><createdOn>2011-11-11T16:22:11.000-06:00</createdOn><createdBy>TEST</createdBy><createdByName>JUDICIAL_SUMMARY</createdByName><updatedOn>2016-04-18T13:02:20.918-05:00</updatedOn><updatedBy>U0063705</updatedBy><updatedByName>Conrad, Roberta (Legal)</updatedByName></summary.metadata></n-metadata><n-docbody><summary.artifact type="judicial" ID="Ia16474d21d3311e4b4bafa136b480ad2"><para><paratext ID="Ia16474d31d3311e4b4bafa136b480ad2">TEST America legal system, abandoned and lost property.</paratext></para><editorial.reference><formattedReference citeType="STATUTE" juris="US"><cite><codeTitle>11</codeTitle> <pubname>U.S.C.A.</pubname> <keyterm>Â§Â§</keyterm> <sectionValue>105(a)</sectionValue>, <sectionValue>110(I)(1)</sectionValue>, <sectionValue>110(a)(1)</sectionValue>, <sectionValue>110(c)(1)</sectionValue>, <sectionValue>110(e)</sectionValue>, <sectionValue>110(h)(2)</sectionValue>, <sectionValue>110(h)(3)</sectionValue>, <sectionValue>526(a)</sectionValue>, <sectionValue>526(a)(2)</sectionValue>, <sectionValue>526(c)</sectionValue></cite>.</formattedReference></editorial.reference></summary.artifact></n-docbody></n-document></n-load>`;
        this.initialContent = `<paratext ID="Icc12d0b1d18f11e587e9c784b41b6052">Here is some text I am going to create that exists in the Summary service. It will include a popular cite: <cite.query w-seq-number="00077" w-ref-type="RP" w-serial-number="1933113869" w-pub-number="0000161" manual-edit="true"><ital>Nanty-Glo</ital></cite.query>.</paratext><paratext ID="Icc12f0b1d18f11e587e9c784b41b6050">I will also put in <bold>BOLD</bold> styling because I need to test those, <wordphrase>bazinga</wordphrase>. Also some <ital>italicized</ital> with a <bold><ital>combination</ital></bold>. Sometimes words can be spelled complee wrong, we need to check for that. .</paratext>`;
    }

    ngAfterViewInit() {
        // Must wait for the view to init before we can load the code mirror instance.
        this.editorContainer.loadEditor();
        this.xmlEditorContainer.loadEditor();
        this.editorContainer.linkEditor(this.xmlEditorContainer);
    }

    public onMouseDown(event: MouseEvent) {
        // Click
        if (event.which === 1) {
            this.editorContainer.mousedown(event);
        }
        // Right Click
        if (event.which === 3) {
            this.editorContainer.contextmenu(event);
        }

        return false;
    }

    public onShowXmlChange(showXml: boolean) {
        this.styleContainer.showXml(showXml);
    }
}
