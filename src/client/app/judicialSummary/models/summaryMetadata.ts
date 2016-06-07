export class SummaryMetadata {
    public summaryArtifactUUID: string;
    public subjectArtifactUUID: string;
    public summarySetVersion: number;
    public summaryNumber: number;
    public summaryRank: number;
    public artifactDescriptor: {
        artifactDescriptorId: number,
        activeFlag: boolean,
        artifactGroup: {
            artifactGroupId: number,
            artifactGroupDesc: string
        },
        artifactType: {
            artifactTypeId: number,
            activeFlag: boolean,
            artifactTypeDesc: string
        },
        artifactSubtype: {
            artifactSubtypeId: number,
            activeFlag: boolean,
            artifactSubtypeDesc: string
        }
    };
    public subjectParaID: string;
    public health: {
        healthId: number,
        activeHealthFlag: boolean
    };
    public languageID: number;
    public createdOn: Date;
    public createdBy: string;
    public createdByName: string;
    public updatedOn: Date;
    public updatedBy: string;
    public updatedByName: string;
}


