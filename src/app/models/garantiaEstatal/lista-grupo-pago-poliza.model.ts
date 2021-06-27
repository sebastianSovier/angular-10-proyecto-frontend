export class ListaGrupoPagoPoliza {

    ID: number;
    IDGRUPOPAGO: number;
    IDGRUPOFAMILIAR: number;
    ULTIMOPERIODOLIQ: number;
    IDTIPOBENEFICIARIO: string;
    DESCTIPOBENEFICIARIO: string;
    IDESTADO: string;
    DESCESTADO: string;
    IDSITUACIONPAGO: string;
    DESCSITUACIONPAGO: string;
    IDRELACION: number;
    DESCRELACION: string;
    NOMBRE: string;
    APELLIDOPATERNO: string;
    APELLIDOMATERNO: string;
    NUMERORUT: number;
    DVRUT: string;
    TIENE_CARGAS: string;
    TIENE_CERT_CIVIL: string;
    TIENE_CERT_ESTUDIO: string;
    TIENE_DEC_RENTA: string;
    TIENE_LIQUIDACION: string;
    TIENE_FUN: string;
    TIENE_MANDATO: string;
    TIENE_PNC: string;

}

export class ListaGrupoPagoPolizaRequest {

    P_POLIZA: number;
    P_TIPOBEN: string;
    P_SITUACION: string;
}

export class ObtieneListaGrupoPagoBeneficiariosResponse {

    GRP_GRUPO: number;
    NAT_ID: number;
    NAT_NOMBRE: string;
    GRP_ISAPRE: number;
    NAT_AP_PAT: string;
    NAT_AP_MAT: string;
    NAT_NUMRUT: number;
    NAT_DV: string;
    DESC_RELACION: string;
    NACIONALIDAD: string;
    DESCRIPCION_NACIONALIDAD: string;
    PROFESION: string;
    DESCRIPCION_PROFESION: string;
    ESTADOGE: string;
    DESCRIPCIONESTADOGE: string;
    ID_RELACION: number;
    CALLE: string;
    COMUNA: string;
    CIUDAD: string;
    TELEFONO1: string;
    TELEFONO2: string;
    PROVINCIA: string;
    EDAD:number;

}

export class ObtieneListaGrupoPagoBeneficiariosRequest {

    P_POLIZA: number;
}
