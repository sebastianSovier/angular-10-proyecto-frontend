export class ObtieneCuotaMortuaria {

    CUO_RUT_RECEPTOR: number;
    CUO_DV_RECEPTOR: string;
    CUO_NOM_RECEPTOR: string;
    CUO_RUT_EMPRESA: number;
    CUO_DV_EMPRESA: string;
    CUO_NOM_EMPRESA: string;
    CUO_SUC_EMPRESA: string;
    CUO_NUM_FACTURA: string;
    CUO_FEC_FACTURA: string;
    CUO_MTO_APROBADO: number;
    CUO_MTO_COBRADO: number;
    CUO_FEC_SOLICITUD: string;
    CUO_FEC_PAGO: string;
    CUO_FEC_LIQUIDA: string;
    CUO_SUCURSAL: string;
    SUC_NOMB: string;
    CUO_MTO_PAGO: number;
    CUO_MTO_LIQUIDO: number;
    CUO_SALDO: number;
    CUO_ESTADO: string;
    ESTADO_TEXTO: string;
    FECHA_SOLICITUD_DDMMYYYY: string;
    FECHA_FACTURA_DDMMYYYY: string;

}

export class ObtieneCuotaMortuariaRequest {

    P_CUO_LIN: number;
    P_CUO_PRD: number;
    P_CUO_DOC: number;
    P_CUO_POL: number;

}
