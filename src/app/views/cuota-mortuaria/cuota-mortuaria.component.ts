import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IngresaCuotaMortuariaModel, IngresaCuotaMortuariaResponse, } from "src/app/models/cuotaMortuaria/ingresa-cuota-mortuaria-model.model";
import { CuotaMortuariaService } from "src/app/services/cuota-mortuaria.service";
import { Sucursales, UfRequest, UfResponse, } from "src/app/models/cuotaMortuaria/sucursales.model";
import { Poliza, PolizaResponse, } from "src/app/models/cuotaMortuaria/poliza.model";
import { Persona, PersonaRequest, PersonaGuardarRequest, PersonaGuardarResponse, PersonaCausanteResponse, PersonaCausanteRequest } from "src/app/models/cuotaMortuaria/persona.model";
import { CertificadoDefuncion, CertificadoDefuncionRequest } from "src/app/models/cuotaMortuaria/certificado-defuncion.model";
import { FormatRutPipe } from "src/app/utilities/format-rut.pipe";
import { DatePipe } from "@angular/common";
import { ObtieneCuotaMortuaria, ObtieneCuotaMortuariaRequest, } from "src/app/models/cuotaMortuaria/obtiene-cuota-mortuaria.model";
import { MessageUtilidad } from "src/app/models/message-utilidad";

import { ModificaAtributoSieteRequest, ModificaAtributoSieteResponse, } from "src/app/models/cuotaMortuaria/modifica-atributo-siete.model";
import { DatosEjecutivo, DatosEjecutivoResponse, } from "src/app/models/cuotaMortuaria/datos-ejecutivo.model";

@Component({
    selector: "app-cuota-mortuaria",
    templateUrl: "./cuota-mortuaria.component.html",
    styleUrls: ["./cuota-mortuaria.component.scss"],
})
export class CuotaMortuariaComponent implements OnInit {

    //parametros de boleta imprimir
    fecha_solicitud = "";
    polizaBoleta = 0;
    compania = "";
    msj_persona = '';
    rut = "";
    sucursalSelected: Sucursales = new Sucursales();
    nombre = "";
    relacion = "";
    fecha_defuncion = "";
    sucursal = "";
    nombre_del_receptor = "";
    rut_receptor = "";
    rut_empresa = "";
    razon_social = "";
    sucursal_empresa = "";
    numero_factura = "";
    fecha_factura = "";
    monto_aprobado = "";
    monto_cobrado = "";
    nombre_ejecutivo = "";
    resultado: number = 0;
    codigo_barra = "";

    displayComprobante = false;

    validarIngreso = true;
    title = "Pensiones";
    compañia = "";
    blocked = false;
    idUsuario = "";
    poliza = 0;
    idBeneficiario = 0;
    Sucursales: Sucursales[] = [];
    Transaccion = 0;
    msgs: MessageUtilidad[] = [];
    ModificaCuotaMortuariaRequest: IngresaCuotaMortuariaModel = new IngresaCuotaMortuariaModel();
    ModificaCuotaMortuariaResponse: IngresaCuotaMortuariaResponse = new IngresaCuotaMortuariaResponse();
    model: any = {};
    personaRequest: PersonaRequest = new PersonaRequest();
    persona: Persona = new Persona();
    respuestaIngresoCuotaMortuaria: IngresaCuotaMortuariaResponse = new IngresaCuotaMortuariaResponse();
    certificadoDefuncion: CertificadoDefuncionRequest = new CertificadoDefuncionRequest();
    guardarPersona: PersonaGuardarRequest = new PersonaGuardarRequest();
    guardarPersonaResponse: PersonaGuardarResponse = new PersonaGuardarResponse();
    ingresaNuevaCuotaMortuariaModel: IngresaCuotaMortuariaModel = new IngresaCuotaMortuariaModel();
    polizaRequest: Poliza = new Poliza();
    polizaResponse: PolizaResponse = new PolizaResponse();
    displayBuscaPersona: boolean = false;
    obtieneCuotaMorturiaRequest: ObtieneCuotaMortuariaRequest = new ObtieneCuotaMortuariaRequest();
    obtieneCuotaMorturiaResponse: ObtieneCuotaMortuaria = new ObtieneCuotaMortuaria();
    modificaAtributoSieteRequest: ModificaAtributoSieteRequest = new ModificaAtributoSieteRequest();
    modificaAtributoSieteResponse: ModificaAtributoSieteResponse = new ModificaAtributoSieteResponse();
    obtieneUfRequest: UfRequest = new UfRequest();
    obtieneUfResponse: UfResponse = new UfResponse();
    ingresoUmodificacion: string = "";
    valorUfHoy = 0.0;
    esModificar = false;
    Modificar = false;
    datosCausanteResponse: PersonaCausanteResponse = new PersonaCausanteResponse();
    datosEjecutivoRequest: DatosEjecutivo = new DatosEjecutivo();
    datosEjecutivoResponse: DatosEjecutivoResponse = new DatosEjecutivoResponse();
    esImpresion = false;
    datosCausanteRequest: PersonaCausanteRequest = new PersonaCausanteRequest();
    GuardarOseleccionar = 'Guardar';
    marcaPersona = 0;
    encontroPersona = false;
    fechaPagoError = false;
    montoCobradoError = false;
    fechaFacturaError = false;
    nFacturaError = false;
    sucursalEmpresaError = false;
    razonSocialError = false;
    rutEmpresaError = false;
    rutReceptorError = false;
    nombreReceptorError = false;
    sucursarlError = false;

    constructor(
        private cuotaMortuariaService: CuotaMortuariaService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private rutproperties: FormatRutPipe,
        private datepipe: DatePipe
    ) {
        // console.log(new Date("10-11-2020"));
        // console.log("---");
        // console.log(this.datepipe.transform(new Date("10-11-2020"), "yyyy-MM-dd"));
    }

    ngOnInit(): void {
        try {
            sessionStorage.clear();
            //  sessionStorage.setItem("ingresoExitoso", "1");
            this.activatedRoute.queryParams.subscribe((params) => {
                this.compañia = params.cia;
                this.idUsuario = params.IdEjecutivo;
                this.poliza = parseInt(params.npoliza);
                this.Transaccion = parseInt(params.ntransaccion);
                this.ingresoUmodificacion = "1";

                if (this.poliza === null || this.poliza === undefined || this.poliza === 0) {
                    this.showWarnViaMessages("Póliza sin recuperar.");
                    return;
                } else {
                    this.ObtenerDatosPoliza();
                    this.ObtieneUf();
                }
            });
        } catch (error) {
            this.router.navigate(["access"]);
        }
    }

    ObtieneCuotaMortuaria() {
        try {
            if (this.poliza) {
                this.obtieneCuotaMorturiaRequest.P_CUO_LIN = this.polizaResponse.POL_LINEA; //3
                this.obtieneCuotaMorturiaRequest.P_CUO_PRD = this.polizaResponse.POL_PRODUCTO;
                this.obtieneCuotaMorturiaRequest.P_CUO_DOC = this.polizaResponse.POL_DOCUMENTO; //2
                this.obtieneCuotaMorturiaRequest.P_CUO_POL = this.polizaResponse.POL_POLIZA; //viene en la url inicial

                this.cuotaMortuariaService
                    .ObtieneCuotaMortuaria(this.obtieneCuotaMorturiaRequest)
                    .subscribe((datos: ObtieneCuotaMortuaria[]) => {

                        if (datos === [] || datos.length === 0) {
                            console.log("no existe registro personas");
                            this.model.fecha_factura = this.datepipe.transform(new Date(), "yyyy-MM-dd");
                            this.model.fecha_pago = this.datepipe.transform(new Date(), "yyyy-MM-dd");
                            this.model.fecha_solicitud = this.datepipe.transform(new Date(), "yyyy-MM-dd");
                        } else {
                            this.obtieneCuotaMorturiaResponse = datos[0];
                            this.ingresoUmodificacion = "2";
                            console.log(this.obtieneCuotaMorturiaResponse);
                            this.model.rut_dv_receptor = this.obtieneCuotaMorturiaResponse.CUO_DV_RECEPTOR;
                            this.model.rut_receptor = this.rutproperties.transform(this.obtieneCuotaMorturiaResponse.CUO_RUT_RECEPTOR.toString() + this.model.rut_dv_receptor.toString());
                            this.model.nombre_receptor = this.obtieneCuotaMorturiaResponse.CUO_NOM_RECEPTOR;
                            this.model.rut_dv_empresa = this.obtieneCuotaMorturiaResponse.CUO_DV_EMPRESA;
                            this.model.rut_empresa = this.rutproperties.transform(this.obtieneCuotaMorturiaResponse.CUO_RUT_EMPRESA.toString() + this.model.rut_dv_empresa.toString());
                            this.model.razon_social = this.obtieneCuotaMorturiaResponse.CUO_NOM_EMPRESA;
                            this.model.sucursal_empresa = this.obtieneCuotaMorturiaResponse.CUO_SUC_EMPRESA;
                            this.model.numero_factura = this.obtieneCuotaMorturiaResponse.CUO_NUM_FACTURA;
                            this.model.fecha_factura = this.obtieneCuotaMorturiaResponse.CUO_FEC_FACTURA;
                            this.model.monto_aprobado = this.obtieneCuotaMorturiaResponse.CUO_MTO_APROBADO;
                            this.model.monto_cobrado = this.obtieneCuotaMorturiaResponse.CUO_MTO_COBRADO;
                            this.model.fecha_solicitud = this.obtieneCuotaMorturiaResponse.CUO_FEC_SOLICITUD;
                            this.model.fecha_pago = this.obtieneCuotaMorturiaResponse.CUO_FEC_PAGO;
                            this.model.fecha_liquida = this.obtieneCuotaMorturiaResponse.CUO_FEC_LIQUIDA;
                            const sucursalElegida = parseInt(this.obtieneCuotaMorturiaResponse.CUO_SUCURSAL);
                            const sucursalSeleccionada = this.Sucursales.filter(function (sucursalSeleccionada) {
                                return (sucursalSeleccionada.ID === sucursalElegida);
                            });
                            this.sucursalSelected = sucursalSeleccionada[0];
                            //this.model.ID.ID = parseInt(this.obtieneCuotaMorturiaResponse.CUO_SUCURSAL);
                            this.model.monto_pagar = this.obtieneCuotaMorturiaResponse.CUO_MTO_PAGO;
                            this.model.monto_liquido_uf = this.obtieneCuotaMorturiaResponse.CUO_MTO_LIQUIDO.toFixed(3);
                            this.model.saldo_uf = this.obtieneCuotaMorturiaResponse.CUO_SALDO.toFixed(3);
                            this.esModificar = true;
                            this.Modificar = true;
                            this.ObtenerDatosCausante();
                            this.ObtenerDatosEjecutivo();
                            // this.completarDatosComprobante();
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }

    SetMontoaPagar() {
        try {
            this.model.monto_pagar = this.model.monto_cobrado;
        } catch (error) { }
    }

    ModificaAtributoSieteActualizacion() {
        try {
            if (this.poliza) {
                this.modificaAtributoSieteRequest.P_CUO_LIN = this.polizaResponse.POL_LINEA; //3
                this.modificaAtributoSieteRequest.P_CUO_PRD = this.polizaResponse.POL_PRODUCTO;
                this.modificaAtributoSieteRequest.P_CUO_DOC = this.polizaResponse.POL_DOCUMENTO; //2
                this.modificaAtributoSieteRequest.P_CUO_POL = this.polizaResponse.POL_POLIZA; //viene en la url inicial

                this.cuotaMortuariaService
                    .ActualizarAtributoSiete(this.modificaAtributoSieteRequest)
                    .subscribe((datos: ModificaAtributoSieteResponse) => {
                        if (datos.P_RESULTADO === 1) {
                            this.router.navigateByUrl("/pago-cuota-mortuaria?respuesta=" + this.ModificaCuotaMortuariaResponse.P_RESULTADO);
                            sessionStorage.setItem("ingresoExitoso", this.ModificaCuotaMortuariaResponse.P_RESULTADO.toString());
                            const sucursalSelected = this.sucursalSelected.ID;
                            const sucursalSeleccionada = this.Sucursales.filter(function (sucursalSeleccionada) {
                                return (sucursalSeleccionada.ID === sucursalSelected);
                            });
                            this.model.textoSucursal = sucursalSeleccionada[0].TEXTO;
                            sessionStorage.setItem("objetoSolicitud", JSON.stringify(this.model));
                            this.router.navigateByUrl("/pago-cuota-mortuaria?respuesta=" + this.ModificaCuotaMortuariaResponse.P_RESULTADO + "");
                            this.modificaAtributoSieteResponse = datos;
                        } else {
                            console.log("no se pudo actualizar atributo 7");
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
        console.log(this.modificaAtributoSieteResponse);
    }

    removeSpecialCharactersNombre(event: any) {
        if (/[^A-Za-z ]/g.test(event.target.value)) {
            const a = event.target.value.length;
            this.model.nombre_beneficiario = event.target.value.substr(0, a - 1);
        }
    }
    removeSpecialCharactersApP(event: any) {
        if (/[^A-Za-z ]/g.test(event.target.value)) {
            const a = event.target.value.length;
            this.model.apellido_paterno = event.target.value.substr(0, a - 1);
        }
    }
    removeSpecialCharactersApM(event: any) {
        if (/[^A-Za-z ]/g.test(event.target.value)) {
            const a = event.target.value.length;
            this.model.apellido_materno = event.target.value.substr(0, a - 1);
        }
    }

    GuardarPersona() {
        try {
            this.msj_persona = '';
            if (this.marcaPersona === 1) {
                this.model.rut_receptor = this.rutproperties.transform(this.model.rut_beneficiario.toString());
                this.model.nombre_receptor = this.model.nombre_beneficiario + " " + this.model.apellido_paterno + " " + this.model.apellido_materno;
                this.CerrarModalPersona();
                return;
            }
            const rutBeneficiario = this.rutproperties.rutClean(this.model.rut_beneficiario);
            this.model.rut_dv_beneficiario = this.rutproperties.devuelveDigito(rutBeneficiario);
            if (this.model.rut_beneficiario.length > 0 && this.model.nombre_beneficiario.length > 0 && this.model.apellido_paterno.length > 0 && this.model.apellido_materno.length > 0 && this.model.rut_dv_beneficiario.length > 0) {

                const nombreCompleto = this.model.nombre_beneficiario + " " + this.model.apellido_paterno + " " + this.model.apellido_materno;
                if (nombreCompleto.length <= 60) {
                    this.guardarPersona.P_NOMBRE = this.model.nombre_beneficiario;
                    this.guardarPersona.P_APE_PAT = this.model.apellido_paterno;
                    this.guardarPersona.P_APE_MAT = this.model.apellido_materno;
                    this.guardarPersona.P_RUT = this.rutproperties.rutSinDigito(rutBeneficiario);
                    this.guardarPersona.P_DV = this.model.rut_dv_beneficiario;

                    this.cuotaMortuariaService
                        .GuardarPersona(this.guardarPersona)
                        .subscribe((datos: PersonaGuardarResponse) => {
                            if (datos.P_RESULTADO === null || datos.P_RESULTADO === undefined || datos.P_RESULTADO !== 1) {
                                //this.GuardarOseleccionar = 'Guardar';
                            } else {
                                // this.GuardarOseleccionar = 'Seleccionar';
                                this.guardarPersonaResponse = datos;
                                if (this.guardarPersonaResponse.P_RESULTADO === 1) {
                                    this.model.rut_receptor = this.guardarPersona.P_RUT.toString() + this.guardarPersona.P_DV.toString();
                                    this.model.rut_receptor = this.rutproperties.transform(this.model.rut_receptor);
                                    this.model.nombre_receptor = this.guardarPersona.P_NOMBRE + " " + this.guardarPersona.P_APE_PAT + " " + this.guardarPersona.P_APE_MAT;
                                    this.displayBuscaPersona = false;
                                    const rutClean = this.rutproperties.rutClean(this.model.rut_receptor);
                                    //const rutCleanNumber = rutClean;
                                    this.ObtienePersona(rutClean);
                                    // this.esModificar = true;
                                }
                            }
                            console.log(datos);
                        });
                } else {
                    alert("Error, supera el largo maximo de 60 caracteres el nombre completo, Por favor corregir.");
                }
            } else {
                alert("Error, debe ingresar todos los datos para ingresar una nueva persona");
            }
        } catch (error) { }
    }
    ObtenerDatosPoliza() {
        try {
            if (this.poliza) {
                this.polizaRequest.P_POLIZA = this.poliza;

                this.cuotaMortuariaService
                    .ObtieneDatosPoliza(this.polizaRequest)
                    .subscribe((datos: PolizaResponse[]) => {
                        if (datos === [] || datos.length === 0) {
                            this.showWarnViaMessages("No existen registros de la Póliza.");
                        } else {
                            sessionStorage.setItem("datosPoliza", JSON.stringify(datos[0]));
                            this.polizaResponse = datos[0];

                            const fechaPoliza = new Date(this.polizaResponse.FEC_INICIO_PAGO);
                            const fechaSolicitud = new Date();
                            if (fechaPoliza.getTime() > fechaSolicitud.getTime()) {
                                this.showWarnViaMessages("No se permite Ingresar solicitud de Cuota Mortuoria a Pólizas Diferidas, Fecha inicio Pago: " + this.polizaResponse.FEC_INICIO_PAGO);
                                return;
                            }
                            //poliza atributo 7 es 2
                            if (this.polizaResponse.POL_ATRB06 === 2) {
                                this.showWarnViaMessages("El ingreso de cuota mortuoria no es aplicable, La cuota mortuoria ya se encuentra Pagada.");
                                return;
                            }
                            if (this.polizaResponse.POL_ATRB06 === undefined || this.polizaResponse.POL_ATRB06 === null || this.polizaResponse.POL_ATRB06 === 0) {
                                this.showWarnViaMessages("NO TIENE DERECHO A PAGO CUOTA MORTUORIA.");
                                return;
                            }
                            this.ObtieneCertificadoDefuncion(this.certificadoDefuncion);
                        }
                    });
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    }

    CerrarModalPersona() {
        try {
            this.displayBuscaPersona = false;
            this.model.rut_beneficiario = undefined;
            this.model.rut_dv_beneficiario = undefined;
            this.model.apellido_paterno = undefined;
            this.model.apellido_materno = undefined;
            this.model.nombre_beneficiario = undefined;
        } catch (error) { }
    }

    ShowBuscaPersonas() {
        this.displayBuscaPersona = true;
    }

    ObjectLength(object) {
        try {
            var length = 0;
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    ++length;
                }
            }
            return length;
        } catch (error) { }
    }

    requiredValidator() {
        try {
            this.fechaPagoError = false;
            this.montoCobradoError = false;
            this.fechaFacturaError = false;
            this.nFacturaError = false;
            this.sucursalEmpresaError = false;
            this.razonSocialError = false;
            this.rutEmpresaError = false;
            this.rutReceptorError = false;
            this.nombreReceptorError = false;
            this.sucursarlError = false;
            if (this.sucursalSelected.TEXTO === undefined || this.sucursalSelected.TEXTO === null || this.sucursalSelected.TEXTO.length === 0) {
                this.sucursarlError = true;
            }
            if (this.model.rut_receptor === undefined || this.model.rut_receptor === null || this.model.rut_receptor.length === 0) {
                this.rutReceptorError = true;
            }
            if (this.model.rut_empresa === undefined || this.model.rut_empresa === null || this.model.rut_empresa.length === 0) {
                this.rutEmpresaError = true;
            }
            if (this.model.nombre_receptor === undefined || this.model.nombre_receptor === null || this.model.nombre_receptor.length === 0) {
                this.nombreReceptorError = true;
            }
            if (this.model.razon_social === undefined || this.model.razon_social === null || this.model.razon_social.length === 0) {
                this.razonSocialError = true;
            }
            if (this.model.sucursal_empresa === undefined || this.model.sucursal_empresa === null || this.model.sucursal_empresa.length === 0) {
                this.sucursalEmpresaError = true;
            }
            if (this.model.numero_factura === undefined || this.model.numero_factura === null || this.model.numero_factura.toString().length === 0) {
                this.nFacturaError = true;
            }
            if (this.model.fecha_factura === undefined || this.model.fecha_factura === null || this.model.fecha_factura.length === 0) {
                this.fechaFacturaError = true;
            }
            if (this.model.monto_cobrado === undefined || this.model.monto_cobrado === null || this.model.monto_cobrado.toString().length === 0) {
                this.montoCobradoError = true;
            }
            if (this.model.fecha_pago === undefined || this.model.fecha_pago === null || this.model.fecha_pago.length === 0) {
                this.fechaPagoError = true;
            }
            if (this.fechaPagoError === false &&
                this.montoCobradoError === false &&
                this.fechaFacturaError === false &&
                this.nFacturaError === false &&
                this.sucursalEmpresaError === false &&
                this.razonSocialError === false &&
                this.rutEmpresaError === false &&
                this.rutReceptorError === false &&
                this.nombreReceptorError === false &&
                this.sucursarlError === false) {
                this.IngresarCuotaMortuaria();
            } else {
                alert(" Hay campos que no se han completado. ");
            }
        } catch (error) {
            alert(" Hay campos que no se han completado. ");
        }
    }

    IngresarCuotaMortuaria() {
        try {
            if (this.ingresoUmodificacion === "1") {
                const rutReceptor = this.rutproperties.rutClean(this.model.rut_receptor);
                this.model.rut_dv_receptor = this.rutproperties.devuelveDigito(rutReceptor);

                const rutEmpresa = this.rutproperties.rutClean(this.model.rut_empresa);
                this.model.rut_dv_empresa = this.rutproperties.devuelveDigito(rutEmpresa);

                //24 en total
                if (
                    this.ObjectLength(this.model) === 22 &&
                    this.sucursalSelected.TEXTO.length > 1 && this.model.rut_receptor.toString().length > 1 && this.model.rut_empresa.toString().length > 1 &&
                    this.model.nombre_receptor.length > 1 && this.model.razon_social.length > 1 && this.model.sucursal_empresa.length > 1 &&
                    this.model.numero_factura.toString().length > 1 && this.model.monto_cobrado.toString().length > 1
                ) {
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_LIN = this.polizaResponse.POL_LINEA; //3
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_PRD = this.polizaResponse.POL_PRODUCTO;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_DOC = this.polizaResponse.POL_DOCUMENTO; //2
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_POL = this.polizaResponse.POL_POLIZA; //viene en la url inicial
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_RUT_RECEPTOR = this.rutproperties.rutSinDigito(rutReceptor);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_DV_RECEPTOR = this.model.rut_dv_receptor;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_NOM_RECEPTOR = this.model.nombre_receptor;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_RUT_EMPRESA = this.rutproperties.rutSinDigito(rutEmpresa);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_DV_EMPRESA = this.model.rut_dv_empresa;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_NOM_EMPRESA = this.model.razon_social;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_SUC_EMPRESA = this.model.sucursal_empresa;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_NUM_FACTURA = this.model.numero_factura;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_FEC_FACTURA = this.model.fecha_factura;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_MTO_APROBADO = Number(this.model.monto_aprobado);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_MTO_COBRADO = Number(this.model.monto_cobrado);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_FEC_SOLICITUD = this.model.fecha_solicitud;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_FEC_PAGO = this.model.fecha_pago;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_FEC_LIQUIDA = this.model.fecha_solicitud;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_SUCURSAL = this.sucursalSelected.ID;
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_MTO_PAGO = Number(this.model.monto_pagar);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_MTO_LIQUIDO = Number(this.model.monto_liquido_uf);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_SALDO = Number(this.model.saldo_uf);
                    this.ingresaNuevaCuotaMortuariaModel.P_CUO_ESTADO = 1;

                    //console.log(this.ingresaNuevaCuotaMortuariaModel);
                    this.cuotaMortuariaService.IngresaNuevaCuotaMortuaria(this.ingresaNuevaCuotaMortuariaModel)
                        .subscribe((datos: IngresaCuotaMortuariaResponse) => {
                            if (datos.P_RESULTADO === null || datos.P_RESULTADO === undefined || datos.P_RESULTADO === 99
                            ) {
                                console.log("hubo problemas al ingresar solicitud");
                                sessionStorage.setItem("ingresoExitoso", "99");
                            } else {
                                this.respuestaIngresoCuotaMortuaria = datos;
                                if (this.respuestaIngresoCuotaMortuaria.P_RESULTADO === 1) {
                                    sessionStorage.setItem("ingresoExitoso", this.respuestaIngresoCuotaMortuaria.P_RESULTADO.toString());
                                    const sucursalSelected = this.sucursalSelected.ID;
                                    const sucursalSeleccionada = this.Sucursales.filter(function (sucursalSeleccionada) {
                                        return (sucursalSeleccionada.ID === sucursalSelected);
                                    });
                                    this.model.textoSucursal = sucursalSeleccionada[0].TEXTO;
                                    sessionStorage.setItem("objetoSolicitud", JSON.stringify(this.model));
                                    this.router.navigateByUrl("/pago-cuota-mortuaria?respuesta=" + this.respuestaIngresoCuotaMortuaria.P_RESULTADO + "");
                                } else {
                                    console.log("hubo problemas al ingresar solicitud");
                                    sessionStorage.setItem("ingresoExitoso", "99");
                                }
                            }
                            console.log(datos);
                        });
                } else {
                    alert(" Hay campos que no se han completado. ");

                }
            } else {
                this.ActualizaCuotaMortuaria();
                this.ModificaAtributoSieteActualizacion;
            }
        } catch (error) {
            alert(" Hay campos que no se han completado. ");
        }
    }


    validaRutEmpresa(rutEmpresa) {

        if (rutEmpresa !== null && rutEmpresa !== undefined) {
            if (!/^[0-9]+[0-9kK]{1}$/.test(rutEmpresa.toString())) {
                //  alert("debe ingresar solo números en el campo 'Rut Empresa' ");
                this.model.rut_empresa = null;
                return;
            }
            if (!this.rutproperties.checkRut(rutEmpresa.toString())) {
                this.model.rut_empresa = null;
                //alert("El rut ingresado es incorrecto ");
            }
        }

    }
    ObtienePersona(rutPersona) {
        try {
            this.msj_persona = '';

            if (rutPersona !== null && rutPersona !== undefined) {
                if (!/^[0-9]+[0-9kK]{1}$/.test(rutPersona.toString())) {
                    //alert("formato rut invalido ej: 77.777.777");
                    this.model.rut_beneficiario = null;
                    return;
                }

                if (this.rutproperties.checkRut(rutPersona.toString())) {
                    const rutReceptor = this.rutproperties.rutClean(rutPersona.toString());
                    this.personaRequest.P_PRUT = parseInt(this.rutproperties.rutSinDigito(rutReceptor).toString());

                    this.cuotaMortuariaService
                        .ObtienePersona(this.personaRequest)
                        .subscribe((datos: Persona[]) => {
                            if (datos === [] || datos.length === 0) {
                                this.GuardarOseleccionar = 'Guardar';
                                console.log("no existe registro personas");
                                this.marcaPersona = 0;
                                this.msj_persona = "Persona no existe.Por favor,llene los campos solicitados";
                                this.persona = null;
                                //this.model.rut_beneficiario = '';
                                this.model.apellido_paterno = '';
                                this.model.apellido_materno = '';
                                this.model.nombre_beneficiario = '';
                                this.encontroPersona = false;
                            } else {
                                this.marcaPersona = 1;
                                this.GuardarOseleccionar = 'Seleccionar';
                                this.msj_persona = '';
                                this.persona = datos[0];
                                this.model.apellido_paterno = this.persona.NAT_AP_PAT;
                                this.model.apellido_materno = this.persona.NAT_AP_MAT;
                                this.model.nombre_beneficiario = this.persona.NAT_NOMBRE;
                                this.encontroPersona = true;
                                console.log(this.persona);
                            }
                        });
                } else {
                    // alert("El rut ingresado es incorrecto ");
                    this.model.rut_beneficiario = null;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    ObtenerDatosCausante() {
        try {
            this.datosCausanteRequest.P_PERSONA_RUT = this.polizaResponse.NUM_RUT_NAT;
            this.datosCausanteRequest.P_POLIZA = this.polizaResponse.POL_POLIZA;
            this.cuotaMortuariaService
                .ObtieneDatosCausante(this.datosCausanteRequest)
                .subscribe((datos: PersonaCausanteResponse[]) => {
                    if (datos === [] || datos.length === 0) {
                        console.log("no existe registro personas");
                    } else {
                        this.datosCausanteResponse = datos[0];
                        if (this.nombre_ejecutivo.length > 10) {
                            this.completarDatosComprobante();
                        }
                        console.log(datos);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    completarDatosComprobante() {
        try {
            this.fecha_solicitud = this.obtieneCuotaMorturiaResponse.FECHA_SOLICITUD_DDMMYYYY;
            this.polizaBoleta = this.poliza;
            this.compania = "Compañia de Seguros CONFUTURO S.A.";
            this.rut = this.datosCausanteResponse.NAT_NUMRUT.toString() + "-" + this.datosCausanteResponse.NAT_DV;
            this.nombre = this.datosCausanteResponse.NAT_NOMBRE + " " + this.datosCausanteResponse.NAT_AP_PAT + " " + this.datosCausanteResponse.NAT_AP_MAT;
            this.relacion = "Causante";
            this.fecha_defuncion = this.datosCausanteResponse.NAT_FEC_MUERTE;
            this.sucursal = this.sucursalSelected.TEXTO;
            this.nombre_del_receptor = this.model.nombre_receptor;
            this.rut_receptor = this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.model.rut_receptor)) + "-" + this.model.rut_dv_receptor;
            this.rut_empresa = this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.model.rut_empresa)) + "-" + this.model.rut_dv_empresa;
            this.razon_social = this.model.razon_social;
            this.sucursal_empresa = this.model.sucursal_empresa;
            this.numero_factura = this.model.numero_factura;
            this.fecha_factura = this.obtieneCuotaMorturiaResponse.FECHA_FACTURA_DDMMYYYY;
            this.monto_aprobado = this.model.monto_aprobado;
            this.monto_cobrado = this.model.monto_cobrado;
            this.nombre_ejecutivo = this.datosEjecutivoResponse.NOMBRES + " " + this.datosEjecutivoResponse.APELLIDOPATERNO;
            //El resto de los dígitos son: identificación de número de póliza, RUT causante y RUT beneficiario (datos variables).
            this.codigo_barra = "210172" + this.poliza.toString() + this.datosCausanteResponse.NAT_NUMRUT.toString() + this.rutproperties.rutClean(this.model.rut_receptor).toString();
        } catch (error) { }
    }

    ObtieneUf() {
        try {
            this.obtieneUfRequest.P_FECHA = this.datepipe.transform(new Date(), "yyyy-MM-dd");
            this.cuotaMortuariaService
                .ObtieneUf(this.obtieneUfRequest)
                .subscribe((datos: UfResponse) => {
                    if (datos.MONTO === null || datos.MONTO === undefined || datos.MONTO === 0) {
                        console.log("no existe datos uf");
                        this.valorUfHoy = 29381.51;
                        //this.valorUfHoy = 0.0;
                        this.model.monto_aprobado = (this.valorUfHoy * 15).toFixed(0).toString();
                        console.log(this.valorUfHoy);
                    } else {
                        //this.valorUfHoy = datos.MONTO;
                        this.valorUfHoy = 29381.51;
                        this.model.monto_aprobado = (this.valorUfHoy * 15).toFixed(0).toString();
                        console.log(this.valorUfHoy);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    CalcularMontos() {
        try {
            const monto_aprobado = Number(this.model.monto_aprobado);
            if (monto_aprobado <= Number(this.model.monto_cobrado)) {
                this.model.saldo_uf = "0";
                this.model.monto_liquido_uf = (Number(this.model.monto_aprobado) / this.valorUfHoy).toFixed(3).toString();
                this.model.monto_pagar = Number(this.model.monto_aprobado).toString();
            } else {
                const montoAux = Number(this.model.monto_cobrado) / this.valorUfHoy;
                this.model.monto_pagar = Number(this.model.monto_cobrado).toString();
                this.model.monto_liquido_uf = montoAux.toFixed(3).toString();
                this.model.saldo_uf = ((Number(this.model.monto_aprobado) - Number(this.model.monto_cobrado)) / this.valorUfHoy).toFixed(3).toString();


            }
        } catch (error) { }
    }

    ObtieneSucursales() {
        try {
            this.cuotaMortuariaService
                .ObtieneSucursales()
                .subscribe((datos: Sucursales[]) => {
                    this.Sucursales = datos;
                    sessionStorage.setItem(
                        "parametrosEntradaCuotaM",
                        JSON.stringify({
                            cia: this.compañia,
                            IDEJECUTIVO: this.idUsuario,
                            poliza: this.poliza,
                            transaccion: this.Transaccion,
                        })
                    );
                    this.validarIngreso = false;
                    console.log(this.Sucursales);

                    this.model.estado = "Ingresado";
                });
        } catch (error) { }
    }

    modificarClick() {
        this.Modificar = false;
        this.esModificar = false;
    }

    ObtieneCertificadoDefuncion(certificadoRequest: CertificadoDefuncionRequest) {
        try {
            if (this.polizaResponse) {
                this.certificadoDefuncion.P_BEN = this.polizaResponse.NAT_ID;
                this.certificadoDefuncion.P_LIN = this.polizaResponse.POL_LINEA;
                this.certificadoDefuncion.P_TIP = 3;
            }

            this.cuotaMortuariaService
                .ObtieneCertificadoDefuncion(this.certificadoDefuncion)
                .subscribe((datos: CertificadoDefuncion) => {
                    console.log(datos);
                    if (datos) {
                        if (datos.P_RESULTADO > 0) {
                            this.ObtieneSucursales();
                            this.ObtieneCuotaMortuaria();
                        } else {
                            this.showWarnViaMessages("Antes de continuar, debe ingresar el certificado de defunción del causante.");
                            return;
                        }
                    }
                });
        } catch (error) { }
    }

    ActualizaCuotaMortuaria() {
        try {
            const rutReceptor = this.rutproperties.rutClean(this.model.rut_receptor);
            this.model.rut_dv_receptor = this.rutproperties.devuelveDigito(rutReceptor);

            // const rutBeneficiario = this.rutproperties.rutClean(this.model.rut_beneficiario);
            //  this.model.rut_dv_beneficiario = this.rutproperties.devuelveDigito(rutBeneficiario);

            const rutEmpresa = this.rutproperties.rutClean(this.model.rut_empresa);
            this.model.rut_dv_empresa = this.rutproperties.devuelveDigito(rutEmpresa);

            //24 en total
            if (this.ObjectLength(this.model) === 18) {
                this.ModificaCuotaMortuariaRequest.P_CUO_LIN = this.polizaResponse.POL_LINEA; //3
                this.ModificaCuotaMortuariaRequest.P_CUO_PRD = this.polizaResponse.POL_PRODUCTO;
                this.ModificaCuotaMortuariaRequest.P_CUO_DOC = this.polizaResponse.POL_DOCUMENTO; //2
                this.ModificaCuotaMortuariaRequest.P_CUO_POL = this.polizaResponse.POL_POLIZA; //viene en la url inicial
                this.ModificaCuotaMortuariaRequest.P_CUO_RUT_RECEPTOR = this.rutproperties.rutSinDigito(this.model.rut_receptor);
                this.ModificaCuotaMortuariaRequest.P_CUO_DV_RECEPTOR = this.model.rut_dv_receptor;
                this.ModificaCuotaMortuariaRequest.P_CUO_NOM_RECEPTOR = this.model.nombre_receptor;
                this.ModificaCuotaMortuariaRequest.P_CUO_RUT_EMPRESA = this.rutproperties.rutSinDigito(this.model.rut_empresa);
                this.ModificaCuotaMortuariaRequest.P_CUO_DV_EMPRESA = this.model.rut_dv_empresa;
                this.ModificaCuotaMortuariaRequest.P_CUO_NOM_EMPRESA = this.model.razon_social;
                this.ModificaCuotaMortuariaRequest.P_CUO_SUC_EMPRESA = this.model.sucursal_empresa;
                this.ModificaCuotaMortuariaRequest.P_CUO_NUM_FACTURA = this.model.numero_factura;
                this.ModificaCuotaMortuariaRequest.P_CUO_FEC_FACTURA = this.model.fecha_factura;
                this.ModificaCuotaMortuariaRequest.P_CUO_MTO_APROBADO = Number(this.model.monto_aprobado);
                this.ModificaCuotaMortuariaRequest.P_CUO_MTO_COBRADO = Number(this.model.monto_cobrado);
                this.ModificaCuotaMortuariaRequest.P_CUO_FEC_SOLICITUD = this.model.fecha_solicitud;
                this.ModificaCuotaMortuariaRequest.P_CUO_FEC_PAGO = this.model.fecha_pago;
                this.ModificaCuotaMortuariaRequest.P_CUO_FEC_LIQUIDA = this.model.fecha_solicitud;
                this.ModificaCuotaMortuariaRequest.P_CUO_SUCURSAL = this.sucursalSelected.ID;
                this.ModificaCuotaMortuariaRequest.P_CUO_MTO_PAGO = Number(this.model.monto_pagar);
                this.ModificaCuotaMortuariaRequest.P_CUO_MTO_LIQUIDO = Number(this.model.monto_liquido_uf);
                this.ModificaCuotaMortuariaRequest.P_CUO_SALDO = Number(this.model.saldo_uf);
                this.ModificaCuotaMortuariaRequest.P_CUO_ESTADO = 1;

                this.cuotaMortuariaService
                    .ModificarSolicitud(this.ModificaCuotaMortuariaRequest)
                    .subscribe((datos: IngresaCuotaMortuariaResponse) => {
                        if (datos.P_RESULTADO === null || datos.P_RESULTADO === undefined || datos.P_RESULTADO === 99) {
                            console.log("hubo problemas al actualizar solicitud");
                            sessionStorage.setItem("ingresoExitoso", "99");
                        } else {
                            this.ModificaCuotaMortuariaResponse = datos;
                            if (this.ModificaCuotaMortuariaResponse.P_RESULTADO === 1) {
                                this.ModificaAtributoSieteActualizacion();
                            } else {
                                console.log("hubo problemas al actualizar solicitud");
                            }
                        }
                        console.log(datos);
                    });
            } else {
                console.log("faltan datos para actualizar");
            }
        } catch (error) {
            console.log("hubo problemas al actualizar solicitud" + error);
        }
    }

    showWarnViaMessages(mensaje: string) {
        this.msgs = [];
        this.msgs.push({ severity: "warn", summary: "", detail: mensaje });
    }

    ImprimirBoleta() {
        try {
            this.esImpresion = true;
            const printContent = document.getElementById("formImprimir");
            const WindowPrt = window.open("", "", "left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0");
            WindowPrt.document.write(printContent.innerHTML);
            WindowPrt.document.write('<link rel="stylesheet" href="/assets/theme/theme-bluegrey.css">');
            WindowPrt.document.write('<link rel="stylesheet" href="/assets/flex.css">');
            WindowPrt.document.close();
            WindowPrt.focus();
            WindowPrt.print();
            this.esImpresion = false;
        } catch (error) { }
    }

    ObtenerDatosEjecutivo() {
        try {
            this.datosEjecutivoRequest.IDEJECUTIVO = this.idUsuario;
            this.cuotaMortuariaService
                .ObtieneDatosEjecutivo(this.datosEjecutivoRequest)
                .subscribe((datos: DatosEjecutivoResponse[]) => {
                    if (datos === [] || datos.length === 0) {
                        console.log("no existe registro personas");
                    } else {
                        this.datosEjecutivoResponse = datos[0];

                        this.completarDatosComprobante();
                        console.log(datos);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }
}
