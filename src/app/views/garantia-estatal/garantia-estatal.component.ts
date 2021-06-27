import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatosEjecutivo, DatosEjecutivoResponse } from 'src/app/models/cuotaMortuaria/datos-ejecutivo.model';
import { PersonaCausanteRequest, PersonaCausanteResponse } from 'src/app/models/cuotaMortuaria/persona.model';
import { Poliza, PolizaResponse } from 'src/app/models/cuotaMortuaria/poliza.model';
import { GrupoPagoModel } from 'src/app/models/garantiaEstatal/grupo-pago-model.model';
import { ListaBeneficiariosModel, ListaBeneficiariosResponseModel } from 'src/app/models/garantiaEstatal/lista-beneficiarios-model.model';
import {
	ListaGrupoPagoPoliza,
	ListaGrupoPagoPolizaRequest,
	ObtieneListaGrupoPagoBeneficiariosRequest,
	ObtieneListaGrupoPagoBeneficiariosResponse,
} from 'src/app/models/garantiaEstatal/lista-grupo-pago-poliza.model';
import { ObtieneDatosControlDocto, ObtieneDatosControlDoctoResponse } from 'src/app/models/garantiaEstatal/obtiene-datos-control-docto.model';
import {
	ValidaSolicitudGarantiaEstatal,
	ValidaSolicitudGarantiaEstatalResponse,
} from 'src/app/models/garantiaEstatal/valida-solicitud-garantia-estatal.model';
import { MessageUtilidad } from 'src/app/models/message-utilidad';
import { AppConfig } from 'src/app/services/appconfig';
import { CuotaMortuariaService } from 'src/app/services/cuota-mortuaria.service';
import { GarantiaEstatalService } from 'src/app/services/garantia-estatal.service';
import { ValidaExisteSolicitudGe, ValidaExisteSolicitudGeResponse } from 'src/app/models/garantiaEstatal/valida-existe-solicitud-ge.model';
import { ValidaCheckSolicitudGe, ValidaCheckSolicitudGeResponse } from 'src/app//models/garantiaEstatal/valida-solicitud-ge.model';
import { ObtieneEstadoGe, ObtieneEstadoGeResponse } from 'src/app/models/garantiaEstatal/obtiene-estado-ge.model';
import { ExisteBenAps, ExisteBenApsResponse } from 'src/app/models/garantiaEstatal/existe-ben-aps.model';
import { DatosSolicitudGe, DatosSolicitudGeResponse } from 'src/app/models/garantiaEstatal/datos-solicitud-ge.model';
import {
	IngresaActualizaSolicitudGe,
	IngresaActualizaSolicitudGeResponse,
} from 'src/app/models/garantiaEstatal/ingresa-actualiza-solicitud-ge.model';
import {
	ValidaSiContinuaSegundaTabla,
	ValidaSiContinuaSegundaTablaResponse,
} from 'src/app/models/garantiaEstatal/valida-si-continua-segunda-tabla.model';
import { DatePipe } from '@angular/common';
import { FormatRutPipe } from 'src/app/utilities/format-rut.pipe';

@Component({
	selector: 'app-garantia-estatal',
	templateUrl: './garantia-estatal.component.html',
	styleUrls: ['./garantia-estatal.component.scss'],
})
export class GarantiaEstatalComponent implements OnInit {
	msgs: MessageUtilidad[] = [];
	validarIngreso = false;
	permiteIngreso = false;
	GrupoPagoPoliza = true;
	displayDeclaracionJuradaSolicitud = false;
	mostrarIframe = false;
	urlSafeAperturaControlDocto: any;
	codigo_barra = '';
	parametrosApertura: string = '';
	controlDoctoRequest: ObtieneDatosControlDocto = new ObtieneDatosControlDocto();
	poliza: number = 0;
	controlDoctoResponse: ObtieneDatosControlDoctoResponse = new ObtieneDatosControlDoctoResponse();
	Subscription: Subscription = new Subscription();
	datosRespuestaRecepcionDoctos: number = 0;
	listaBeneficiariosRequest: ListaBeneficiariosModel = new ListaBeneficiariosModel();
	listaGrupoPagoRequest: GrupoPagoModel = new GrupoPagoModel();
	listaGrupoPagoResponse: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	listaGrupoPagoPolizaRequest: ListaGrupoPagoPolizaRequest = new ListaGrupoPagoPolizaRequest();
	listaGrupoPagoPolizaResponse: ListaGrupoPagoPoliza[] = [];
	listaBeneficiariosResponse: ListaBeneficiariosResponseModel[] = [];
	validaSolicitudGe: ValidaSolicitudGarantiaEstatal = new ValidaSolicitudGarantiaEstatal();
	validaSolicitudGeResponse: ValidaSolicitudGarantiaEstatalResponse = new ValidaSolicitudGarantiaEstatalResponse();
	compañia: any = '';
	idUsuario: any = '';
	Transaccion: number = 0;
	selectedBeneficiarios: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	selectedGrupoPago: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	listaHijosCausante: ListaBeneficiariosResponseModel[] = [];
	generoRemesable = true;
	esSolicitud = false;
	esActualizacion = false;
	datosEjecutivoRequest: DatosEjecutivo = new DatosEjecutivo();
	datosEjecutivoResponse: DatosEjecutivoResponse = new DatosEjecutivoResponse();
	datosCausanteRequest: PersonaCausanteRequest = new PersonaCausanteRequest();
	datosCausanteResponse: PersonaCausanteResponse = new PersonaCausanteResponse();
	polizaRequest: Poliza = new Poliza();
	polizaResponse: PolizaResponse = new PolizaResponse();
	ValidaExisteSolicitudGeRequest: ValidaExisteSolicitudGe = new ValidaExisteSolicitudGe();
	ValidaExisteSolicitudGeResponse: ValidaExisteSolicitudGeResponse = new ValidaExisteSolicitudGeResponse();
	ObtieneListaGrupoPagoBeneficiariosRequest: ObtieneListaGrupoPagoBeneficiariosRequest = new ObtieneListaGrupoPagoBeneficiariosRequest();
	ObtieneListaGrupoPagoBeneficiariosResponse: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	selectedListaGrupoPagoBeneficiarios: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	ValidaContinuaSegundaTablaRequest: ValidaSiContinuaSegundaTabla = new ValidaSiContinuaSegundaTabla();
	ValidaContinuaSegundaTablaResponse: ValidaSiContinuaSegundaTablaResponse[] = [];

	ValidaCheckSolicitudGeRequest: ValidaCheckSolicitudGe = new ValidaCheckSolicitudGe();
	ValidaCheckSolicitudGeResponse: ValidaCheckSolicitudGeResponse = new ValidaCheckSolicitudGeResponse();
	ObtieneEstadoGeRequest: ObtieneEstadoGe = new ObtieneEstadoGe();
	ObtieneEstadoGeResponse: ObtieneEstadoGeResponse[] = [];
	IngresaActualizaSolicitudGeRequest: IngresaActualizaSolicitudGe = new IngresaActualizaSolicitudGe();
	IngresaActualizaSolicitudGeResponse: IngresaActualizaSolicitudGeResponse = new IngresaActualizaSolicitudGeResponse();
	months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayu', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	estadosValidosActualizacion = 'EA AP';
	estadosValidosIngreso = 'BP SR RE AS SE SO SU SP';

	ano_solicitud = '..........................................';
	telefono_celular = '.........................................';
	nombre_beneficiario = '.........................................';
	ciudad_beneficiario = '.........................................';
	rut_beneficiario = '.........................................';
	calle_domicilio = '.........................................';
	provincia = '.........................................';
	profesion = '.........................................';

	telefono_fijo = '.........................................';
	nombre_causante = '.........................................';
	rut_causante = '.........................................';
	rut_solicitante = '.........................................';
	rut_ejecutivo = '.........................................';
	sucursal_empresa = '.........................................';
	ciudad_documento = '.........................................';
	estado_civil = '.........................................';
	nacionalidad = '.........................................';
	fecha_hoy = '';
	nombre_ejecutivo = '';
	comuna = '.........................................';
	cierreModalRecepcionDocto = false;
	tipoAccion = '';
	tieneHijos = false;
	ExisteBenApsRequest: ExisteBenAps = new ExisteBenAps();
	ExisteBenApsResponse: ExisteBenApsResponse = new ExisteBenApsResponse();
	ObtieneDatosSolicitudGeRequest: DatosSolicitudGe = new DatosSolicitudGe();
	ObtieneDatosSolicitudGeResponse: DatosSolicitudGeResponse[] = [];
	ingresoValido = true;
	ingresoExitoso = false;
	muestraMensajeTramiteExitoso = false;
	constructor(
		private datepipe: DatePipe,
		private rutproperties: FormatRutPipe,
		private activatedRoute: ActivatedRoute,
		private garantiaService: GarantiaEstatalService,
		private sanitizer: DomSanitizer,
		private cuotaMortuariaService: CuotaMortuariaService
	) { }

	ngOnInit(): void {
		try {
			sessionStorage.clear();
			this.activatedRoute.queryParams.subscribe((params) => {
				this.compañia = params.cia;
				this.idUsuario = params.IdEjecutivo;
				this.poliza = parseInt(params.npoliza);
				this.Transaccion = parseInt(params.ntransaccion);
				this.tipoAccion = params.tipoAccion;
				//1 SOBREVIVENCIA // 8 vejez // 2 invalidez
				if (this.poliza === null || this.poliza === undefined || this.poliza === 0) {
					this.showWarnViaMessagesString('Póliza sin recuperar.');
					return;
				} else {
					this.ObtenerDatosPoliza();
				}
				if (this.tipoAccion === 'A') {
					this.esActualizacion = true;
				}
			});
		} catch (error) { }
	}
	showWarnViaMessagesString(mensaje: string) {
		this.msgs = [];
		this.msgs.push({ severity: 'warn', summary: '', detail: mensaje });
	}
	showWarnViaMessages(opcion: number) {
		if (opcion === 1) {
			this.msgs = [];
			this.msgs.push({
				severity: 'success',
				summary: '',
				detail:
					'Documentos Ingresados Correctamente , Remesable:  ' +
					this.datosRespuestaRecepcionDoctos +
					'  Número de transacción Asociada:  ' +
					this.Transaccion +
					'',
			});
		} else {
			this.msgs = [];
			this.msgs.push({
				severity: 'warn',
				summary: '',
				detail: 'No se genero remesable para esta transaccion,debe intentar nuevamente la recepción de documentos.',
			});
		}
	}
	CambioBeneficiarioGrupoPago() {
		try {
			this.msgs = [];
			if (this.selectedBeneficiarios.length === 0 || this.selectedBeneficiarios === undefined || this.selectedBeneficiarios.length > 1) {
				this.showWarnViaMessagesString('Seleccione un Beneficiario, Porfavor.');
				return;
			}
			if (this.polizaResponse.SIN_TIPO === 1) {
				this.ValidaSiContinuaSegundaTabla(0);
				return;
			}
			if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
				this.ValidaSiContinuaSegundaTabla(1);
				return;
			}
		} catch (error) { }
	}

	ObtieneGrupoPagoBeneficiario(grupo: number) {
		try {
			this.msgs = [];
			if (this.poliza) {
				if (grupo === 0) {
					grupo = this.selectedBeneficiarios[0].GRP_GRUPO;
				} else {
					grupo = 0;
				}
				this.listaGrupoPagoRequest.P_POLIZA = this.poliza;
				this.listaGrupoPagoRequest.P_GRUPO = Number(grupo);

				this.garantiaService
					.ObtieneGrupoPagoBeneficiario(this.listaGrupoPagoRequest)
					.subscribe((datos: ObtieneListaGrupoPagoBeneficiariosResponse[]) => {
						if (datos === [] || datos.length === 0) {
							this.GrupoPagoPoliza = false;
							this.ingresoValido = false;
							this.showWarnViaMessagesString('No hay beneficiarios Asociados.');
							return;
						} else {
							this.msgs = [];
							this.listaGrupoPagoResponse = datos;
							this.listaGrupoPagoResponse.forEach((grupoPago) => {
								if (grupoPago.NAT_NUMRUT.toString() === '1' && grupoPago.NAT_DV === '9') {
									this.msgs = [];
									this.showWarnViaMessagesString('NH: No Habilitado Para Ingreso de Certificado.');
								}
							});
							if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
								this.selectedGrupoPago = this.listaGrupoPagoResponse;
								this.GrupoPagoPoliza = false;
								this.ingresoValido = true;
								return;
							}
							this.ObtieneCheckEstadoGe();
							if (this.polizaResponse.SIN_TIPO === 1) {
								this.ExisteBenAps();
								this.GrupoPagoPoliza = false;
								this.ingresoValido = true;
								return;
							}
							// console.log(datos);
						}
					});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ImprimirBoleta() {
		try {
			const printContent = document.getElementById('formImprimir');
			const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
			WindowPrt.document.write(printContent.innerHTML);
			WindowPrt.document.write('<link rel="stylesheet" href="/assets/theme/theme-bluegrey.css">');
			WindowPrt.document.write('<link rel="stylesheet" href="/assets/flex.css">');
			WindowPrt.document.close();
			WindowPrt.focus();
			WindowPrt.print();
		} catch (error) { }
	}

	AbrirRecepcionDeDocumentos() {
		try {
			if (this.selectedGrupoPago.length > 1) {
				this.showWarnViaMessagesString('Seleccione un registro porfavor.');
				return;
			}
			this.cierreModalRecepcionDocto = false;
			this.parametrosApertura =
				'?lneg=' +
				this.compañia + //lo que ingresa por url de ingreso cuota mortuaria CF
				'&lpro=4' +
				'&plan=1' +
				'&prod=1' +
				'&proc=' +
				this.controlDoctoResponse.CRPROCESO +
				'&cact=' +
				this.controlDoctoResponse.IDACTIVIDAD +
				'&idop=' +
				this.poliza +
				'&clte=' +
				this.selectedGrupoPago[0].NAT_NUMRUT +
				'&ncon=' +
				this.poliza +
				'&trem=NO' +
				'&sdes=' +
				this.datosEjecutivoResponse.CODIGOSUCURSAL +
				'&ddes=' +
				this.datosEjecutivoResponse.CODIGOCENTROCOSTO +
				'&mvto=' +
				this.controlDoctoResponse.MOVIMIENTO +
				'&sori=' +
				this.datosEjecutivoResponse.CODIGOSUCURSAL +
				'&dori=' +
				this.datosEjecutivoResponse.CODIGOSUCURSAL +
				'&user=' +
				this.datosEjecutivoResponse.RUTEMPLEADO +
				'&host=192.168.0.0' +
				'&ccar=' +
				this.selectedGrupoPago[0].GRP_GRUPO + //lista grupos familiares
				'&crut=' +
				this.selectedGrupoPago[0].NAT_NUMRUT + //lista rut grupo familiar  rut beneficiario
				'&cpar=' +
				this.selectedGrupoPago[0].ID_RELACION + //lista cod relacion grupo familiar
				'&cnom=' +
				this.selectedGrupoPago[0].NAT_NOMBRE +
				' ' +
				this.selectedGrupoPago[0].NAT_AP_PAT +
				' ' +
				this.selectedGrupoPago[0].NAT_AP_MAT + //lista NOMBRES grupo familiar   nombre beneficiario
				'&ntransaccion=' +
				this.Transaccion;

			//ingresa con los mismos parametros que a cuota mortuaria por la url
			this.urlSafeAperturaControlDocto = this.sanitizer.bypassSecurityTrustResourceUrl(
				AppConfig.settings.UrlAbrirControlDocumentos + this.parametrosApertura
			);
			this.mostrarIframe = true;
			// console.log(this.urlSafeAperturaControlDocto);
			this.RespuestaRecepcionDoctos();
		} catch (error) { }
	}
	ObtenerDatosControlDocto() {
		try {
			if (this.poliza) {
				this.controlDoctoRequest.P_POLIZA = this.poliza;
				this.controlDoctoRequest.P_IDBEN = this.selectedGrupoPago[0].NAT_ID;
				this.controlDoctoRequest.P_TIPOSOL = this.tipoAccion;

				this.garantiaService.ObtieneDatosControlDocto(this.controlDoctoRequest).subscribe((datos: ObtieneDatosControlDoctoResponse[]) => {
					if (datos === [] || datos.length === 0) {
						// console.log('no existe datos control documento');
					} else {
						this.controlDoctoResponse = datos[0];
						// console.log(datos);
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ObtenerListaGrupoPagoPoliza() {
		try {
			if (this.poliza) {
				this.listaHijosCausante = [];
				this.listaGrupoPagoPolizaRequest.P_POLIZA = Number(this.poliza);
				this.listaGrupoPagoPolizaRequest.P_SITUACION = 'EP';
				this.listaGrupoPagoPolizaRequest.P_TIPOBEN = 'T';
				this.garantiaService.ObtieneListaGrupoPagoPoliza(this.listaGrupoPagoPolizaRequest).subscribe((datos: ListaGrupoPagoPoliza[]) => {
					if (datos === [] || datos.length === 0) {
						// console.log('no existe grupo pago poliza');
					} else {
						this.listaGrupoPagoPolizaResponse = datos;
						this.listaGrupoPagoPolizaResponse = this.listaGrupoPagoPolizaResponse.sort((a, b) => a.IDRELACION - b.IDRELACION);
						// console.log(datos);
						// id grupopago 0 1 4
						this.listaGrupoPagoPolizaResponse = this.listaGrupoPagoPolizaResponse.filter((array) => {
							if (array.IDSITUACIONPAGO === 'EP') {
								return array;
							} else {
								return;
							}
						});
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ValidaIngresoGe() {
		try {
			if (this.ingresoExitoso === true) {
				this.permiteIngreso = false;
				this.displayDeclaracionJuradaSolicitud = true;
				return;
			} else {
				this.permiteIngreso = false;
			}

			if (this.selectedGrupoPago.length === 0 || this.selectedGrupoPago === undefined || this.selectedGrupoPago.length > 1) {
				this.showWarnViaMessagesString('Seleccione un Registro, Porfavor.');
				return;
			} else {
				if (
					(this.selectedGrupoPago.length === 0 && this.selectedListaGrupoPagoBeneficiarios.length === 0) ||
					(this.selectedGrupoPago.length === 0 && this.selectedListaGrupoPagoBeneficiarios === undefined) ||
					(this.selectedGrupoPago.length === 0 && this.selectedListaGrupoPagoBeneficiarios.length > 1)
				) {
					this.showWarnViaMessagesString('Seleccione un Registro, Porfavor.');
					return;
				}
				if (
					(this.tipoAccion === 'A' && this.ValidaEstadosActualizacionGe() === true) ||
					(this.tipoAccion === 'S' && this.ValidaEstadosIngresoGe() === true)
				) {
					this.validaSolicitudGe.P_POLIZA = this.poliza;
					this.validaSolicitudGe.P_BEN_ID = this.selectedGrupoPago[0].NAT_ID;
					this.validaSolicitudGe.P_LINEA = this.polizaResponse.POL_LINEA;
					this.validaSolicitudGe.P_RST = 2;
					this.validaSolicitudGe.P_TIPO = 2;

					this.garantiaService.ValidaSolicitudGe(this.validaSolicitudGe).subscribe((datos: ValidaSolicitudGarantiaEstatalResponse) => {
						if ((datos.P_RESULTADO === null && this.tipoAccion === 'S') || (datos.P_RESULTADO === undefined && this.tipoAccion === 'S')) {
							this.permiteIngreso = true;
							this.showWarnViaMessagesString('Solicitud en Trámite,no puede ingresar una nueva.');
							// console.log(datos);
							return;
						} else if (datos.P_RESULTADO === 1 && this.tipoAccion === 'S') {
							this.permiteIngreso = true;
							this.showWarnViaMessagesString('Solicitud en Trámite,no puede ingresar una nueva.');
							// console.log(datos);
							return;
						} else {
							this.ValidaExisteSolicitudGE();
						}
					});
				} else {
					this.ValidaEstadosActualizacionGe();
					return;
				}
			}
		} catch (error) {
			// console.log(error);
		}
	}

	volverTablaBeneficiarios() {
		try {
			this.GrupoPagoPoliza = true;
			this.msgs = [];
			this.selectedBeneficiarios = [];
			this.selectedGrupoPago = [];
			this.selectedListaGrupoPagoBeneficiarios = [];
			this.ingresoValido = true;
			this.displayDeclaracionJuradaSolicitud = false;
			this.ingresoExitoso = false;
			this.permiteIngreso = false;
			this.cierreModalRecepcionDocto = false;
			this.generoRemesable = true;
			this.muestraMensajeTramiteExitoso = false;
		} catch (error) { }
	}
	closeModal() {
		this.cierreModalRecepcionDocto = true;
	}
	cerrarModalDeclaracion() {
		this.displayDeclaracionJuradaSolicitud = false;
		this.AbrirRecepcionDeDocumentos();
	}
	RespuestaRecepcionDoctos() {
		try {
			setTimeout(() => {
				const parametrosRespuesta =
					'?p_transac=' +
					this.Transaccion +
					'&cia=' +
					this.compañia +
					'&p_proceso=' +
					this.controlDoctoResponse.IDPROCESO +
					'&p_poliza=' +
					this.poliza +
					'&p_rutcliente=' +
					this.selectedGrupoPago[0].NAT_NUMRUT;

				this.Subscription = this.cuotaMortuariaService.ObtieneRespuestaRecepcionDoctos(parametrosRespuesta).subscribe((datos) => {
					if (this.cierreModalRecepcionDocto === true) {
						if (datos > 0) {
							this.datosRespuestaRecepcionDoctos = datos;
							this.showWarnViaMessages(1);
							this.Subscription.unsubscribe();
							this.generoRemesable = true;
						} else {
							this.showWarnViaMessages(3);
							this.generoRemesable = false;
							return;
						}
					} else {
						this.RespuestaRecepcionDoctos();
					}
				});
			}, 1000);
		} catch (error) {
			// console.log(error);
		}
	}
	ObtenerDatosEjecutivo() {
		try {
			this.datosEjecutivoRequest.IDEJECUTIVO = this.idUsuario;
			this.cuotaMortuariaService.ObtieneDatosEjecutivo(this.datosEjecutivoRequest).subscribe((datos: DatosEjecutivoResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no existe registro personas');
				} else {
					this.datosEjecutivoResponse = datos[0];

					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	ValidaSiContinuaSegundaTabla(grupo: number) {
		try {
			this.msgs = [];
			if (grupo === 0) {
				grupo = this.selectedBeneficiarios[0].GRP_GRUPO;
			} else {
				grupo = 0;
			}
			this.ValidaContinuaSegundaTablaRequest.P_GRUPO = Number(grupo);
			this.ValidaContinuaSegundaTablaRequest.P_POLIZA = this.poliza;
			this.garantiaService
				.ValidaSiContinuaSegundaTabla(this.ValidaContinuaSegundaTablaRequest)
				.subscribe((datos: ValidaSiContinuaSegundaTablaResponse[]) => {
					if (datos === [] || datos.length === 0) {
						this.GrupoPagoPoliza = false;
						this.ingresoValido = false;
						this.showWarnViaMessagesString('No hay beneficiarios Asociados.');
						return;
					} else {
						this.ValidaContinuaSegundaTablaResponse = datos;
						if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
							this.ExisteBenAps(this.datosCausanteResponse.NAT_ID);
						} else {
							this.ObtieneGrupoPagoBeneficiario(0);
						}

						// console.log(datos);
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}
	ObtieneDatosSolicitudGe() {
		try {
			this.ObtieneDatosSolicitudGeRequest.P_POLIZA = this.poliza;
			this.garantiaService.ObtieneDatosSolicitudGe(this.ObtieneDatosSolicitudGeRequest).subscribe((datos: DatosSolicitudGeResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no existe registro personas');
				} else {
					this.ObtieneDatosSolicitudGeResponse = datos;

					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	completarDatosComprobante() {
		try {
			//cambiar todos los selecteddatosbeneficiario por selectgrupopago
			this.ano_solicitud = new Date().getFullYear().toString();
			//crear if si es solicitud o actualizacion
			//0218 solicitud // Actualización  0366
			if (this.tipoAccion === 'A') {
				this.esSolicitud = false;
				this.esActualizacion = true;

				this.codigo_barra =
					'210366' + this.poliza + this.datosCausanteResponse.NAT_NUMRUT.toString() + this.selectedGrupoPago[0].NAT_NUMRUT.toString();
			} else {
				this.esSolicitud = true;
				this.esActualizacion = false;
				this.codigo_barra =
					'210218' + this.poliza + this.datosCausanteResponse.NAT_NUMRUT.toString() + this.selectedGrupoPago[0].NAT_NUMRUT.toString();
			}
			if (this.selectedGrupoPago[0].TELEFONO1) {
				this.telefono_fijo = this.selectedGrupoPago[0].TELEFONO1;
			}
			if (this.selectedGrupoPago[0].TELEFONO2) {
				this.telefono_celular = this.selectedGrupoPago[0].TELEFONO2;
			}
			if (this.selectedGrupoPago[0].NAT_NOMBRE && this.selectedGrupoPago[0].NAT_AP_PAT && this.selectedGrupoPago[0].NAT_AP_MAT) {
				this.nombre_beneficiario =
					this.selectedGrupoPago[0].NAT_NOMBRE + ' ' + this.selectedGrupoPago[0].NAT_AP_PAT + ' ' + this.selectedGrupoPago[0].NAT_AP_MAT;
			}
			if (this.selectedGrupoPago[0].NAT_NUMRUT && this.selectedGrupoPago[0].NAT_DV) {
				this.rut_beneficiario = this.selectedGrupoPago[0].NAT_NUMRUT + '-' + this.selectedGrupoPago[0].NAT_DV;
			}
			if (this.selectedGrupoPago[0].CALLE) {
				this.calle_domicilio = this.selectedGrupoPago[0].CALLE;
			}
			if (this.selectedGrupoPago[0].COMUNA) {
				this.comuna = this.selectedGrupoPago[0].COMUNA;
			}
			if (this.datosCausanteResponse.NAT_NOMBRE && this.datosCausanteResponse.NAT_AP_PAT && this.datosCausanteResponse.NAT_AP_MAT) {
				this.nombre_causante =
					this.datosCausanteResponse.NAT_NOMBRE + ' ' + this.datosCausanteResponse.NAT_AP_PAT + ' ' + this.datosCausanteResponse.NAT_AP_MAT;
			}
			if (this.datosCausanteResponse.NAT_NUMRUT && this.datosCausanteResponse.NAT_DV) {
				this.rut_causante = this.datosCausanteResponse.NAT_NUMRUT + '-' + this.datosCausanteResponse.NAT_DV;
			}
			this.rut_solicitante = this.selectedGrupoPago[0].NAT_NUMRUT + '-' + this.selectedGrupoPago[0].NAT_DV;

			this.rut_ejecutivo = this.datosEjecutivoResponse.RUTEMPLEADO + '-' + this.datosEjecutivoResponse.DIGITORUTEMPLEADO;
			this.sucursal_empresa = this.datosEjecutivoResponse.SUCURSAL;
			if (this.selectedGrupoPago[0].CIUDAD) {
				this.ciudad_documento = this.selectedGrupoPago[0].CIUDAD;
			}
			if (this.selectedGrupoPago[0].CIUDAD) {
				this.provincia = this.selectedGrupoPago[0].PROVINCIA;
			}
			if (this.selectedGrupoPago[0].DESCRIPCION_PROFESION) {
				this.profesion = this.selectedGrupoPago[0].DESCRIPCION_PROFESION;
			}
			if (this.selectedGrupoPago[0].DESCRIPCION_NACIONALIDAD) {
				this.nacionalidad = this.selectedGrupoPago[0].DESCRIPCION_NACIONALIDAD;
			}
			this.fecha_hoy =
				new Date().getDate().toString() +
				' de ' +
				this.months[new Date().getMonth()].toString() +
				' de ' +
				new Date().getFullYear().toString();
			this.nombre_ejecutivo = this.datosEjecutivoResponse.NOMBRES + ' ' + this.datosEjecutivoResponse.APELLIDOPATERNO;
		} catch (error) {
			// console.log(error);
		}
	}
	ObtenerDatosCausante() {
		try {
			this.datosCausanteRequest.P_PERSONA_RUT = this.polizaResponse.NUM_RUT_NAT;
			this.datosCausanteRequest.P_POLIZA = this.polizaResponse.POL_POLIZA;
			this.garantiaService.ObtieneDatosCausante(this.datosCausanteRequest).subscribe((datos: PersonaCausanteResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no existe registro causante');
				} else {
					this.datosCausanteResponse = datos[0];
					// console.log(datos);
					if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
						this.ObtieneListaGrupoPagoBeneficiarios();
						return;
					}
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	ObtenerDatosPoliza() {
		try {
			if (this.poliza) {
				this.polizaRequest.P_POLIZA = this.poliza;
				this.cuotaMortuariaService.ObtieneDatosPoliza(this.polizaRequest).subscribe((datos: PolizaResponse[]) => {
					if (datos === [] || datos.length === 0) {
					} else {
						this.polizaResponse = datos[0];
						if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
							this.ObtenerDatosCausante();
						} else {
							this.ObtenerDatosCausante();
							this.ObtieneDatosSolicitudGe();
							this.ObtieneListaGrupoPagoBeneficiarios();
							this.ObtenerDatosEjecutivo();
						}
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneListaGrupoPagoBeneficiarios() {
		try {
			if (this.poliza) {
				this.ObtieneListaGrupoPagoBeneficiariosRequest.P_POLIZA = this.poliza;
				this.garantiaService
					.ObtieneListaGrupoPagoBeneficiarios(this.polizaRequest)
					.subscribe((datos: ObtieneListaGrupoPagoBeneficiariosResponse[]) => {
						if (datos === [] || datos.length === 0) {
							this.showWarnViaMessagesString('No hay beneficiarios Asociados.');
							return;
						} else {
							this.ObtieneListaGrupoPagoBeneficiariosResponse = datos;
							this.ObtieneListaGrupoPagoBeneficiariosResponse = this.ObtieneListaGrupoPagoBeneficiariosResponse.sort(
								(a, b) => a.GRP_GRUPO - b.GRP_GRUPO
							);

							this.ObtieneListaGrupoPagoBeneficiariosResponse.forEach((grupoPago) => {
								if (grupoPago.NAT_NUMRUT.toString() === '1' && grupoPago.NAT_DV === '9') {
									this.msgs = [];
									this.showWarnViaMessagesString('NH: No Habilitado Para Ingreso de Certificado.');
								}
							});
							if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
								this.ObtieneListaGrupoPagoBeneficiariosResponse = this.ObtieneListaGrupoPagoBeneficiariosResponse.splice(0, 1);
								this.selectedBeneficiarios = this.ObtieneListaGrupoPagoBeneficiariosResponse;
								this.ExisteBenAps(this.datosCausanteResponse.NAT_ID);
								this.ValidaSiContinuaSegundaTabla(1);
								this.ObtenerDatosEjecutivo();
								// console.log(datos);
							}
						}
					});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ValidaExisteSolicitudGE() {
		try {
			if (this.poliza) {
				this.ValidaExisteSolicitudGeRequest.P_POLIZA = this.poliza;
				this.ValidaExisteSolicitudGeRequest.P_TIPO = 2;
				this.ValidaExisteSolicitudGeRequest.P_LINEA = this.polizaResponse.POL_LINEA;
				this.ValidaExisteSolicitudGeRequest.P_BEN_ID = this.selectedGrupoPago[0].NAT_ID;
				this.garantiaService
					.ValidaExisteSolicitudGE(this.ValidaExisteSolicitudGeRequest)
					.subscribe((datos: ValidaExisteSolicitudGeResponse) => {
						if (datos === null || datos === undefined || datos.P_RESULTADO === 0) {
							this.completarDatosComprobante();
							this.displayDeclaracionJuradaSolicitud = true;
						} else {
							this.ValidaExisteSolicitudGeResponse = datos;
							if (this.selectedGrupoPago[0].ESTADOGE !== null) {
								// para los beneficiarios con estado SO, se valida
								// el tiempo de Solicitud en caso de existir
								if (this.selectedGrupoPago[0].ESTADOGE === 'SO') {
									// si la solicitud es > 180 dias debe permitir
									// ingresar solicitud
									this.ObtieneDatosSolicitudGeResponse = this.ObtieneDatosSolicitudGeResponse.filter((rep) => {
										const fechaSolicitud = new Date(rep.SOL_FEC_SOL_FC);
										const fechaHoy = new Date();
										if (this.rutproperties.validaFechas(fechaHoy, fechaSolicitud, 'suscripcion') === 1) {
											return;
										} else {
											return rep;
										}
									});
									if (this.ObtieneDatosSolicitudGeResponse.length > 0) {
										//!this.  solicitudDelegate.validaTiempoSolicitudGE(poliza, user))
										this.GrupoPagoPoliza = false;
										this.ingresoValido = false;
										this.ingresoExitoso = null;
										this.showWarnViaMessagesString('Fallo. Solicitud en trámite, no puede ingresar una nueva.');
										return;
									}
								} else {
									this.GrupoPagoPoliza = false;
									this.ingresoExitoso = null;
									this.ingresoValido = false;
									this.showWarnViaMessagesString('Fallo. Solicitud en trámite, no puede ingresar una nueva.');
									return;
								}
							} else {
								this.GrupoPagoPoliza = false;
								this.ingresoExitoso = null;
								this.ingresoValido = false;
								this.showWarnViaMessagesString('Fallo. Ya existe una solicitud de garantia estatal.');
								return;
							}
							this.completarDatosComprobante();
							this.displayDeclaracionJuradaSolicitud = true;
						}
					});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}
	ObtieneEstadoGe() {
		try {
			if (this.poliza) {
				this.ObtieneEstadoGeRequest.P_POLIZA = this.poliza;
				this.ObtieneEstadoGeRequest.P_BEN = this.selectedGrupoPago[0].NAT_ID;
				this.ObtieneEstadoGeRequest.P_CAUSA = this.datosCausanteResponse.NAT_ID;
				this.ObtieneEstadoGeRequest.P_LIN = 3;

				this.garantiaService.ObtieneEstadoGe(this.ObtieneEstadoGeRequest).subscribe((datos: ObtieneEstadoGeResponse[]) => {
					if (datos === [] || datos.length === 0) {
					} else {
						this.ObtieneEstadoGeResponse = datos;
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}
	ObtieneCheckEstadoGe() {
		try {
			if (this.poliza) {
				//String estado = "SU";
				//Integer codigoCausal = new Integer(40);
				//1 es transitorio 0 no es

				this.ValidaCheckSolicitudGeRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;
				this.ValidaCheckSolicitudGeRequest.P_CAU = this.datosCausanteResponse.NAT_ID;
				this.ValidaCheckSolicitudGeRequest.P_COD = 40;
				this.ValidaCheckSolicitudGeRequest.P_EST = 'SU';
				this.ValidaCheckSolicitudGeRequest.P_POL = this.poliza;

				this.garantiaService.ObtieneCheckEstadoGe(this.ValidaCheckSolicitudGeRequest).subscribe((datos: ValidaCheckSolicitudGeResponse) => {
					if (datos === undefined || datos === null) {
					} else {
						this.ValidaCheckSolicitudGeResponse = datos;
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ExisteBenAps(nat_id?) {
		try {
			if (this.poliza) {
				this.msgs = [];
				if (nat_id === null || nat_id === undefined) {
					this.ExisteBenApsRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;
					this.ExisteBenApsRequest.P_LIN = 3;
					this.ExisteBenApsRequest.P_POL = this.poliza;
				} else {
					this.ExisteBenApsRequest.P_BEN = nat_id;
					this.ExisteBenApsRequest.P_LIN = 3;
					this.ExisteBenApsRequest.P_POL = this.poliza;
				}

				this.garantiaService.ExisteBenAps(this.ExisteBenApsRequest).subscribe((datos: ExisteBenApsResponse) => {
					if (datos === undefined || datos === null) {
					} else {
						this.ExisteBenApsResponse = datos;
						if (this.polizaResponse.SIN_TIPO === 1) {
							this.ValidacionesPolizas();
						}
						if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
							this.ValidacionesPolizas();
							if (this.msgs.length > 0) {
								return;
							}
							this.ObtieneGrupoPagoBeneficiario(1);
						}
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}
	IngresaActualizaSolicitudGe() {
		try {
			if (this.poliza) {
				this.IngresaActualizaSolicitudGeRequest.P_IDBEN = this.selectedGrupoPago[0].NAT_ID;
				this.IngresaActualizaSolicitudGeRequest.P_FEC_SOL = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
				this.IngresaActualizaSolicitudGeRequest.P_ID_CRE = this.datosEjecutivoResponse.USUARIODATABASE;
				this.IngresaActualizaSolicitudGeRequest.P_POL = this.poliza;
				this.IngresaActualizaSolicitudGeRequest.P_RUTEJECUTIVO = this.datosEjecutivoResponse.RUTEMPLEADO.toString();
				this.IngresaActualizaSolicitudGeRequest.P_SUCURSAL = this.datosEjecutivoResponse.SUCURSAL.toString();

				this.garantiaService
					.IngresaActualizaSolicitudGe(this.IngresaActualizaSolicitudGeRequest)
					.subscribe((datos: IngresaActualizaSolicitudGeResponse) => {
						if (datos === undefined || datos === null || datos.P_RESULTADO === 0) {
							this.ingresoExitoso = false;
							// console.log('error al ingresar o actualizar solicitud ge');
						} else {
							this.IngresaActualizaSolicitudGeResponse = datos;

							if (this.IngresaActualizaSolicitudGeResponse.P_RESULTADO === 1) {
								this.ObtenerDatosControlDocto();
								this.ingresoExitoso = true;
								this.permiteIngreso = false;
								this.muestraMensajeTramiteExitoso = true;
							} else {
								this.ingresoExitoso = false;
								this.permiteIngreso = false;
								this.muestraMensajeTramiteExitoso = true;
							}
						}
					});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ValidacionesPolizas() {
		try {
			if (this.polizaResponse.SIN_TIPO != null && this.polizaResponse.SIN_TIPO == 8) {
				if (this.polizaResponse.SIN_TIPO == 8) {
					//FR-34890 Tipo de Pension Vejez: Validar Solicitud de Garantia Estatal causante tenga 50 o mas años al 1 de Julio del 2008

					const fechaNacCausante = new Date(this.datosCausanteResponse.NAT_FEC_NACIM);
					const fechaTope = new Date('01-06-2008');
					if (fechaNacCausante.getTime() > fechaTope.getTime()) {
						return;
					}
					if (fechaNacCausante.getTime() < fechaTope.getTime()) {
						this.ingresoValido = false;
						this.showWarnViaMessagesString(
							'causante debe tener 50 o mas años al 1 de Julio del 2008, no puede acceder a la solicitud GE'
						);
						return;
					}
				}
			}

			if (this.polizaResponse.SIN_TIPO === 8 || this.polizaResponse.SIN_TIPO === 9) {
				// sexo masculino y menor a 65
				if ('M' === this.datosCausanteResponse.SEXO && this.datosCausanteResponse.EDAD < 65) {
					this.showWarnViaMessagesString('Fallo. El pensionado aun no cumple la edad legal');
					return;
				}

				// sexo femenino y menor a 60
				if ('F' === this.datosCausanteResponse.SEXO && this.datosCausanteResponse.EDAD < 60) {
					this.showWarnViaMessagesString('Fallo. El pensionado aun no cumple la edad legal');
					return;
				}
				if (this.selectedBeneficiarios) {
					if (this.selectedBeneficiarios[0].ID_RELACION === 0) this.ingresoValido = false;
					this.showWarnViaMessagesString(
						'Fallo. El tipo de relación [9 :  Otro ] no permite ingresar Solicitud o Actualización de GE. Beneficiario de periodo garantizado'
					);
					return;
				}
				if (this.selectedGrupoPago) {
					if (this.selectedGrupoPago[0].ID_RELACION === 0) this.ingresoValido = false;
					this.showWarnViaMessagesString(
						'Fallo. El tipo de relación [9 :  Otro ] no permite ingresar Solicitud o Actualización de GE. Beneficiario de periodo garantizado'
					);
					return;
				}
			}

			if (this.polizaResponse.SIN_TIPO === 8) {
				//FR-34890 Tipo de Pension Vejez: Validar Existe en APS Si ya tiene  una resolución “vigente”  y “en pago” de APS, no puede acceder a la GE
				if (this.ExisteBenApsResponse.P_RESULTADO === 1) {
					this.GrupoPagoPoliza = false;
					this.ingresoValido = false;
					this.showWarnViaMessagesString('Existe en APS Si ya tiene  una resolución vigente, no puede acceder a la solicitud GE');
					return;
				}
			}

			if (this.polizaResponse.SIN_TIPO === 2) {
				//FR-34890 Tipo de Pension Invalidez: Validar Existe en APS Si ya tiene  una resolución “vigente”  y “en pago” de APS, no puede acceder a la GE
				if (this.ExisteBenApsResponse.P_RESULTADO === 1) {
					this.GrupoPagoPoliza = false;
					this.ingresoValido = false;
					this.showWarnViaMessagesString('Existe en APS Si ya tiene  una resolución vigente, no puede acceder a la solicitud GE');
					return;
				}
			}

			if (this.polizaResponse.SIN_TIPO === 2) {
				//FR-34890 Tipo de Pension Invalidez: Validar que la fecha del siniestro de invalidez sea menor o igual al 31/12/2023

				const valid = new Date('31-12-2023');
				// boolean annos = utilDelegate.before(this.datosCausanteResponse.;//true ; //utilDelegate.before(new Date (causanteBen.getFechaInvalidez()), new Date (fechaTope));

				if (new Date(this.datosCausanteResponse.FECHAINVALIDEZ).getTime() <= valid.getTime()) {
					this.GrupoPagoPoliza = false;
					this.ingresoValido = false;
					this.showWarnViaMessagesString(
						'la fecha del siniestro de invalidez debe ser menor o igual al 31/12/2023, no puede acceder a la solicitud GE'
					);
					return;
				}
				// FR-34890 Tipo de Pension Sobrevivencia: Validar Existe en APS Si
				// ya tiene una resolución “vigente” y “en pago” de APS, no puede
				// acceder a la GE
			}
			if (this.ExisteBenApsResponse.P_RESULTADO === 1) {
				this.GrupoPagoPoliza = false;
				this.ingresoValido = false;
				this.showWarnViaMessagesString('Existe en APS Si ya tiene  una resolución vigente, no puede acceder a la solicitud GE');
				return;
			}
		} catch (error) { }
	}

	ValidaEstadosActualizacionGe(): boolean {
		try {
			if (this.selectedListaGrupoPagoBeneficiarios.length > 0) {
				if (
					this.tipoAccion === 'A' &&
					this.estadosValidosActualizacion.indexOf(this.selectedListaGrupoPagoBeneficiarios[0].ESTADOGE) !== -1
				) {
					return true;
				} else {
					if (this.tipoAccion === 'A' && this.selectedListaGrupoPagoBeneficiarios[0].ESTADOGE === 'SU') {
						if (this.ValidaCheckSolicitudGeResponse.P_RESULTADO === 1) {
							return true;
						}
						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Actualización de GE.');
						return false;
					} else {
						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Actualización de GE.');
						return false;
					}
				}
			} else if (this.selectedGrupoPago.length > 0) {
				let estado = this.selectedGrupoPago[0].ESTADOGE;
				if (estado === '') {
					estado = 'NULO';
				}
				if (this.tipoAccion === 'A' && this.estadosValidosActualizacion.indexOf(estado) !== -1) {
					return true;
				} else {
					if (estado === 'NULO') {
						this.showWarnViaMessagesString(
							'Estado Ge Beneficiario, no permite ingresar Actualización de GE. Solo Permite Ingreso Solicitud.'
						);
						return false;
					}
					if (this.tipoAccion === 'A' && this.selectedGrupoPago[0].ESTADOGE === 'SU') {
						if (this.ValidaCheckSolicitudGeResponse.P_RESULTADO === 1) {
							return true;
						}

						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Actualización de GE.');
						return false;
					} else {
						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Actualización de GE.');
						return false;
					}
				}
			}
		} catch (error) { }
	}
	ValidaEstadosIngresoGe(): boolean {
		try {
			if (this.selectedListaGrupoPagoBeneficiarios.length > 0) {
				if (
					(this.tipoAccion === 'S' && this.estadosValidosIngreso.indexOf(this.selectedListaGrupoPagoBeneficiarios[0].ESTADOGE) !== -1) ||
					this.selectedListaGrupoPagoBeneficiarios[0].ESTADOGE === ''
				) {
					return true;
				} else {
					if (
						(this.tipoAccion === 'S' && this.selectedListaGrupoPagoBeneficiarios[0].ESTADOGE === 'SU') ||
						this.selectedListaGrupoPagoBeneficiarios[0].ESTADOGE === ''
					) {
						if (this.ValidaCheckSolicitudGeResponse.P_RESULTADO === 1) {
							return true;
						}

						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Actualización de GE.');
						return false;
					} else {
						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Actualización de GE.');
						return false;
					}
				}
			} else if (this.selectedGrupoPago.length > 0) {
				if (
					(this.tipoAccion === 'S' && this.estadosValidosIngreso.indexOf(this.selectedGrupoPago[0].ESTADOGE) !== -1) ||
					this.selectedGrupoPago[0].ESTADOGE === ''
				) {
					return true;
				} else {
					if ((this.tipoAccion === 'S' && this.selectedGrupoPago[0].ESTADOGE === 'SU') || this.selectedGrupoPago[0].ESTADOGE === '') {
						if (this.ValidaCheckSolicitudGeResponse.P_RESULTADO === 1) {
							return true;
						}

						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Solicitud de GE.');
						return false;
					} else {
						this.showWarnViaMessagesString('Estado Ge Beneficiario, no permite ingresar Solicitud de GE.');
						return false;
					}
				}
			}
		} catch (error) { }
	}
}
