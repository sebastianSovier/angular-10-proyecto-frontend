export class ModificaAtributoSieteRequest {

    P_CUO_LIN: number;
    P_CUO_PRD: number;
    P_CUO_DOC: number;
    P_CUO_POL: number;

}
export class ModificaAtributoSieteResponse {

    P_RESULTADO: number;
}

export class ObtieneDatosBeneficiarioRequest {

    P_CUO_LIN: number;
    P_CUO_PRD: number;
    P_CUO_DOC: number;
    P_CUO_POL: number;
    P_BEN: number;

}
export class ObtieneDatosBeneficiarioResponse {

    BNF_GRUPO: number;
    BEN_RELACION: number;
}