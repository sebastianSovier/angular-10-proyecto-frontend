
export class IngresaCuotaMortuariaModel {

    P_CUO_LIN: number;
    P_CUO_PRD: number;
    P_CUO_DOC: number;
    P_CUO_POL: number;
    P_CUO_RUT_RECEPTOR: number;
    P_CUO_DV_RECEPTOR: string;
    P_CUO_NOM_RECEPTOR: string;
    P_CUO_RUT_EMPRESA: number;
    P_CUO_DV_EMPRESA: string;
    P_CUO_NOM_EMPRESA: string;
    P_CUO_SUC_EMPRESA: string;
    P_CUO_NUM_FACTURA: number;
    P_CUO_FEC_FACTURA: string;
    P_CUO_MTO_APROBADO: number;
    P_CUO_MTO_COBRADO: number;
    P_CUO_FEC_SOLICITUD: string;
    P_CUO_FEC_PAGO: string;
    P_CUO_FEC_LIQUIDA: string;
    P_CUO_SUCURSAL: number;
    P_CUO_MTO_PAGO: number;
    P_CUO_MTO_LIQUIDO: number;
    P_CUO_SALDO: number;
    P_CUO_ESTADO: number;

}

export class IngresaCuotaMortuariaResponse {

    P_RESULTADO: number;
}

export class IngresaNuevaCuotaMortuariaModel {

    P_LIN: number;
    P_PRD: number;
    P_DOC: number;
    P_POL: number;
    p_rut_recep: number;
    p_dv_recep: string;
    p_nom_recep: string;
    p_rut_empresa: number;
    P_DV_EMPRESA: string;
    P_NOM_EMPRESA: string;
    P_SUC_EMPRESA: string;
    P_NUM_FACTURA: number;
    P_FEC_FACTURA: string;
    P_MTO_APROBADO: number;
    P_MTO_COBRADO: number;
    P_FEC_SOLICITUD: string;
    P_FEC_PAGO: string;
    P_FEC_LIQUIDA: string;
    P_SUCURSAL: number;
    P_MTO_PAGO: number;
    P_MTO_LIQUIDO: number;
    P_SALDO: number;
    P_ESTADO: number;

}

export class IngresaNuevaCuotaMortuariaResponse {

    P_RESULTADO: number;
}
