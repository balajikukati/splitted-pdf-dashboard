// src/app/models/image-trace-master.model.ts

export interface ImageTraceMaster {
    ITM_ImageID?: number;
    ITM_BatchID: number;
    ITM_SetID?: number;
    ITM_UserID?: number;
    ITM_StageID?: number;
    ITM_SubStageID?: number;
    ITM_ImageName: string;
    ITM_IsValid?: boolean;
    ITM_IsProcessed?: boolean;
    ITM_DocTypeId?: number;
    ITM_CreateDate?: Date;
    ITM_NoOfPage?: number;
    ITM_Comment?: string;
    ITM_Retransmission_Flag?: boolean;
    ITM_Recording_Date?: Date;
    ITM_Header_Count?: number;
    ITM_PI_BatchID?: string;
    ITM_VerifyHeaderCount?: number;
    ITM_IsIndexed?: boolean;
    ITM_DocTypeHeaderCount?: number;
    ITM_IsPartyAllowed?: boolean;
    ITM_MarkerStatus?: boolean;
    ITM_Suspense_Processed?: boolean;
    ITM_Suspense_Success?: boolean;
    ITM_Suspense_Date?: Date;
    ITM_FO_MarkerStatus?: number;
    ITM_LO_MarkerStatus?: number;
    ITM_PDFName?: string;
  }
  