export class Persona {

    NAT_NUMRUT: number;
    NAT_AP_PAT: string;
    NAT_AP_MAT: string;
    NAT_NOMBRE: string;
    NAT_ID: number;
    NAT_FEC_NACIM: string;
    NAT_SEXO: string;
    NAT_RST: string;
}

export class PersonaRequest {
    P_PRUT: number;
}
export class PersonaGuardarRequest {

    P_RUT: number;
    P_DV: string;
    P_NOMBRE: string;
    P_APE_PAT: string;
    P_APE_MAT: string;
}
export class PersonaGuardarResponse {

    P_RESULTADO: number;
}
export class PersonaCausanteResponse {

    NAT_NUMRUT: number;
    NAT_AP_PAT: string;
    NAT_AP_MAT: string;
    NAT_NOMBRE: string;
    NAT_ID: number;
    NAT_FEC_NACIM: string;
    NAT_SEXO: string;
    NAT_RST: string;
    NAT_FEC_MUERTE: string;
    NAT_DV: string;
    FECHAINVALIDEZ: string;
    EDAD: number;
    SEXO: string;
}

export class PersonaCausanteRequest {
    P_PERSONA_RUT: number;
    P_POLIZA: number;
}