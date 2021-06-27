import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatosEjecutivo, DatosEjecutivoResponse } from 'src/app/models/cuotaMortuaria/datos-ejecutivo.model';
import {
	Persona,
	PersonaCausanteRequest,
	PersonaCausanteResponse,
	PersonaGuardarRequest,
	PersonaGuardarResponse,
	PersonaRequest,
} from 'src/app/models/cuotaMortuaria/persona.model';
import { Poliza, PolizaResponse } from 'src/app/models/cuotaMortuaria/poliza.model';
import { AppConfig } from 'src/app/services/appconfig';
import { CuotaMortuariaService } from 'src/app/services/cuota-mortuaria.service';
import { GarantiaEstatalService } from 'src/app/services/garantia-estatal.service';
import { RetencionJudicialService } from 'src/app/services/retencion-judicial.service';
import { IngresoPoderesService } from 'src/app/services/ingreso-poderes.service';
import { FormatRutPipe } from 'src/app/utilities/format-rut.pipe';
import { ActualizaCargaRj, ActualizaCargaRjResponse } from 'src/app/models/retencionJudicial/actualiza-carga-rj.model';
import { AgregaRj, AgregaRjResponse } from 'src/app/models/retencionJudicial/agrega-rj.model';
import { CheckRetJud, CheckRetJudResponse } from 'src/app/models/retencionJudicial/check-ret-jud.model';
import { BorraRetencionJudicial, BorraRetencionJudicialResponse } from 'src/app/models/retencionJudicial/borra-retencion-judicial.model';
import { ObtieneListaRj, ObtieneListaRjResponse } from 'src/app/models/retencionJudicial/obtiene-lista-rj.model';
import {
	ObtieneListaRjParaEliminar,
	ObtieneListaRjParaEliminarResponse,
} from 'src/app/models/retencionJudicial/obtiene-lista-rj-para-eliminar.model';
import { ObtieneRetencionesJud, ObtieneRetencionesJudResponse } from 'src/app/models/retencionJudicial/obtiene-retenciones-jud.model';
import { ObtieneSecuenciaRjResponse } from 'src/app/models/retencionJudicial/obtiene-secuencia-rj.model';
import { Sucursales } from 'src/app/models/cuotaMortuaria/sucursales.model';
import {
	ObtieneListaGrupoPagoBeneficiariosRequest,
	ObtieneListaGrupoPagoBeneficiariosResponse,
} from 'src/app/models/garantiaEstatal/lista-grupo-pago-poliza.model';
import { ObtienePeriodoActualResponse } from 'src/app/models/retencionJudicial/obtiene-periodo-actual.model';
import { ObtienePensionVejInv, ObtienePensionVejInvResponse } from 'src/app/models/retencionJudicial/obtiene-pension-vej-inv.model';
import { ObtienePensionSobre, ObtienePensionSobreResponse } from 'src/app/models/retencionJudicial/obtiene-pension-sobre.model';
import { CheckRetJudicial, CheckRetJudicialResponse } from 'src/app/models/retencionJudicial/check-ret-judicial.model';
import { ObtieneListaFormaDescuentos } from 'src/app/models/retencionJudicial/obtiene-lista-forma-descuentos.model';
import { ObtieneListaFormaPagos } from 'src/app/models/retencionJudicial/obtiene-lista-forma-pagos.model';
import { ObtieneListaAsigFamiliar } from 'src/app/models/retencionJudicial/obtiene-lista-asig-familiar.model';
import { ObtieneListaBancos } from 'src/app/models/retencionJudicial/obtiene-lista-bancos.model';
import { ObtieneDatosControlDoctoResponse } from 'src/app/models/retencionJudicial/obtiene-datos-control-docto.model';
import { CheckTieneGarantiaEstatal, CheckTieneGarantiaEstatalResponse } from 'src/app/models/retencionJudicial/check-tiene-garantia-estatal.model';
import { ObtenerEstadoGe, ObtenerEstadoGeResponse } from 'src/app/models/retencionJudicial/obtener-estado-ge.model';
import {
	ObtieneBonoMontoMinimoPension,
	ObtieneBonoMontoMinimoPensionResponse,
} from 'src/app/models/retencionJudicial/obtiene-bono-monto-minimo-pension.model';
import { ObtieneMontoMinimoPension, ObtieneMontoMinimoPensionResponse } from 'src/app/models/retencionJudicial/obtiene-monto-minimo-pension.model';
import { ObtieneValidacionFechaResponse } from 'src/app/models/retencionJudicial/obtiene-validacion-fecha-response.model';
import { DatosSolicitudGe } from 'src/app/models/garantiaEstatal/datos-solicitud-ge.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
	selector: 'app-retencion-judicial',
	templateUrl: './retencion-judicial.component.html',
	styleUrls: ['./retencion-judicial.component.scss'],
})
export class RetencionJudicialComponent implements OnInit {
	compañia: any;
	idUsuario: any;
	poliza: number;
	Transaccion: number;
	msgs: any[];
	model: any = {};
	permiteIngreso = false;
	validarIngreso = false;
	seleccionoBeneficiario = false;
	datosRespuestaRecepcionDoctos: string;
	polizaRequest: Poliza = new Poliza();
	polizaResponse: PolizaResponse = new PolizaResponse();
	datosCausanteRequest: PersonaCausanteRequest = new PersonaCausanteRequest();
	datosCausanteResponse: PersonaCausanteResponse = new PersonaCausanteResponse();
	datosEjecutivoRequest: DatosEjecutivo = new DatosEjecutivo();
	datosEjecutivoResponse: DatosEjecutivoResponse = new DatosEjecutivoResponse();
	Subscription: Subscription = new Subscription();
	cierreModalRecepcionDocto: boolean;
	generoRemesable: boolean;
	esconderRecepcionExitoso: boolean;
	parametrosApertura: string;
	controlDoctoResponse: ObtieneDatosControlDoctoResponse = new ObtieneDatosControlDoctoResponse();
	urlSafeAperturaControlDocto: any;
	mostrarIframe = false;
	ObtieneListaBeneficiariosRjResponse: [] = [];
	selectedBeneficiarioRj: [] = [];
	displayBuscaPersona = false;
	persona: Persona = new Persona();
	guardarPersona: PersonaGuardarRequest = new PersonaGuardarRequest();
	guardarPersonaResponse: PersonaGuardarResponse = new PersonaGuardarResponse();
	GuardarOseleccionar = 'Guardar';
	personaRequest: PersonaRequest = new PersonaRequest();
	rutBeneficiario = '';
	nombreBeneficiario = '';
	guardoCorrectamente = false;
	ActualizaCargaRjRequest: ActualizaCargaRj = new ActualizaCargaRj();
	ActualizaCargaRjResponse: ActualizaCargaRjResponse = new ActualizaCargaRjResponse();
	AgregaRjRequest: AgregaRj = new AgregaRj();
	AgregaRjResponse: AgregaRjResponse = new AgregaRjResponse();
	CheckRetJudRequest: CheckRetJud = new CheckRetJud();
	CheckRetJudResponse: CheckRetJudResponse = new CheckRetJudResponse();
	BorraRetencionJudicialRequest: BorraRetencionJudicial = new BorraRetencionJudicial();
	BorraRetencionJudicialResponse: BorraRetencionJudicialResponse = new BorraRetencionJudicialResponse();
	ObtieneListaRjRequest: ObtieneListaRj = new ObtieneListaRj();
	ObtieneListaRjResponse: ObtieneListaRjResponse[] = [];
	ObtieneListaRjParaEliminarRequest: ObtieneListaRjParaEliminar = new ObtieneListaRjParaEliminar();
	ObtieneListaRjParaEliminarResponse: ObtieneListaRjParaEliminarResponse[] = [];
	ObtieneRetencionesJudicialesRequest: ObtieneRetencionesJud = new ObtieneRetencionesJud();
	ObtieneRetencionesJudicialesResponse: ObtieneRetencionesJudResponse[] = [];
	ObtieneSecuenciaResponse: ObtieneSecuenciaRjResponse = new ObtieneSecuenciaRjResponse();
	sucursalSelected: Sucursales = new Sucursales();
	Sucursales: Sucursales[] = [];
	ObtieneListaGrupoPagoBeneficiariosResponse: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	selectedBeneficiarios: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	ObtieneListaGrupoPagoBeneficiariosRequest: ObtieneListaGrupoPagoBeneficiariosRequest = new ObtieneListaGrupoPagoBeneficiariosRequest();
	ObtieneMontoPensionVejInvRequest: ObtienePensionVejInv = new ObtienePensionVejInv();
	ObtieneMontoPensionVejInvResponse: ObtienePensionVejInvResponse = new ObtienePensionVejInvResponse();
	ObtieneMontoPensionSobreRequest: ObtienePensionSobre = new ObtienePensionSobre();
	ObtieneMontoPensionSobreResponse: ObtienePensionSobreResponse = new ObtienePensionSobreResponse();
	CheckRetJudicialRequest: CheckRetJudicial = new CheckRetJudicial();
	CheckRetJudicialResponse: CheckRetJudicialResponse = new CheckRetJudicialResponse();
	ObtienePeriodoActualResponse: ObtienePeriodoActualResponse = new ObtienePeriodoActualResponse();
	ObtieneListaFormaDescuentoResponse: ObtieneListaFormaDescuentos[] = [];
	ObtieneListaFormaPagoResponse: ObtieneListaFormaPagos[] = [];
	ObtieneListaAsigFamiliarResponse: ObtieneListaAsigFamiliar[] = [];
	ObtieneListaBancosResponse: ObtieneListaBancos[] = [];
	selectedFormaDescuento: ObtieneListaFormaDescuentos = new ObtieneListaFormaDescuentos();
	selectedFormaPago: ObtieneListaFormaPagos = new ObtieneListaFormaPagos();
	selectedAsigFamiliar: ObtieneListaAsigFamiliar = new ObtieneListaAsigFamiliar();
	selectedBanco: ObtieneListaBancos = new ObtieneListaBancos();
	pensionImponible = 0;
	periodoActual = '';
	habilitarPorcentaje = false;
	habilitarMonto = false;
	fechasInvalidas = false;
	montoInvalido = false;
	formaPagoSucursal = false;
	formaPagoDomicilio = false;
	formaPagoDepositoEnCuenta = false;
	formaPagoDomicilioTribunal = false;
	formaPagoTribunal = false;
	formaPagoCuentaCorriente = false;
	CheckTieneGarantiaEstatalRequest: CheckTieneGarantiaEstatal = new CheckTieneGarantiaEstatal();
	CheckTieneGarantiaEstatalResponse: CheckTieneGarantiaEstatalResponse = new CheckTieneGarantiaEstatalResponse();
	ObtieneEstadoGeRequest: ObtenerEstadoGe = new ObtenerEstadoGe();
	ObtieneEstadoGeResponse: ObtenerEstadoGeResponse = new ObtenerEstadoGeResponse();
	ObtieneBonoMontoMinimoPensionRequest: ObtieneBonoMontoMinimoPension = new ObtieneBonoMontoMinimoPension();
	ObtieneBonoMontoMinimoPensionResponse: ObtieneBonoMontoMinimoPensionResponse = new ObtieneBonoMontoMinimoPensionResponse();
	ObtieneMontoMinimoPensionRequest: ObtieneMontoMinimoPension = new ObtieneMontoMinimoPension();
	ObtieneMontoMinimoPensionResponse: ObtieneMontoMinimoPensionResponse = new ObtieneMontoMinimoPensionResponse();
	ObtieneValidacionFechaResponse: ObtieneValidacionFechaResponse = new ObtieneValidacionFechaResponse();
	mensajeRjExitoso = '';
	periodoActualNumber = 0;
	msj_persona = ''
	marcaPersona = 0;

	constructor(
		private datepipe: DatePipe,
		private rutproperties: FormatRutPipe,
		private retencionJudicialService: RetencionJudicialService,
		private garantiaService: GarantiaEstatalService,
		private activatedRoute: ActivatedRoute,
		private ingresoPoderesService: IngresoPoderesService,
		private cuotaMortuariaService: CuotaMortuariaService,
		private sanitizer: DomSanitizer
	) { }

	ngOnInit(): void {
		try {
			sessionStorage.clear();
			this.activatedRoute.queryParams.subscribe((params) => {
				this.compañia = params.cia;
				this.idUsuario = params.IdEjecutivo;
				this.poliza = parseInt(params.npoliza);
				this.Transaccion = parseInt(params.ntransaccion);
				if (this.poliza === null || this.poliza === undefined || this.poliza === 0) {
					this.showWarnViaMessagesString('Póliza sin recuperar.');
					return;
				} else {
					this.validarIngreso = true;
					this.seleccionoBeneficiario = false;
					this.ObtenerDatosPoliza();
				}
			});
			this.model.fecha_recepcion = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.model.fecha_emision = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
		} catch (error) { }
	}

	ShowBuscaPersonas() {
		this.displayBuscaPersona = true;
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
							// console.log(datos);
						}
					});
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneSucursales() {
		try {
			this.cuotaMortuariaService.ObtieneSucursales().subscribe((datos: Sucursales[]) => {
				this.Sucursales = datos;
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

	SeleccionBeneficiario() {
		try {
			this.msgs = [];
			if (this.selectedBeneficiarios.length === 0 || this.selectedBeneficiarios === undefined || this.selectedBeneficiarios.length > 1) {
				this.showWarnViaMessagesString('Seleccione un Registro, Porfavor.');
				return;
			}
			this.validarIngreso = false;
			this.seleccionoBeneficiario = true;
			this.rutBeneficiario = this.selectedBeneficiarios[0].NAT_NUMRUT + '-' + this.selectedBeneficiarios[0].NAT_DV;
			this.nombreBeneficiario =
				this.selectedBeneficiarios[0].NAT_NOMBRE +
				' ' +
				this.selectedBeneficiarios[0].NAT_AP_PAT +
				' ' +
				this.selectedBeneficiarios[0].NAT_AP_MAT;
			this.ObtieneSecuenciaRj();
			if (this.polizaResponse.SIN_TIPO === 2 || this.polizaResponse.SIN_TIPO === 8) {
				this.ObtieneMontoPensionVejInv();
			} else if (this.polizaResponse.SIN_TIPO === 1) {
				this.ObtieneMontoPensionSobre();
			}
		} catch (error) { }
	}

	ValidaFechas() {
		try {
			this.msgs = [];
			const fechaEmision = new Date(this.model.fecha_emision);
			const fechaRecepcion = new Date();
			if (fechaEmision > fechaRecepcion) {
				this.showWarnViaMessagesString('Fecha Emisión debe ser anterior o igual a la fecha de recepción.');
				this.fechasInvalidas = true;
				return;
			} else {
				this.fechasInvalidas = false;
			}
		} catch (error) { }
	}

	CambioFormaPago() {
		//sucursal validar numero id
		try {
			this.formaPagoSucursal = false;
			this.formaPagoDomicilio = false;
			this.formaPagoDepositoEnCuenta = false;
			this.formaPagoDomicilioTribunal = false;
			this.formaPagoTribunal = false;
			this.formaPagoCuentaCorriente = false;
			this.model.direccion_rj = undefined;
			this.model.comuna_rj = undefined;
			this.model.ciudad_rj = undefined;
			this.selectedBanco = undefined;
			this.model.nro_cuenta_rj = undefined;
			this.sucursalSelected = undefined;
			if (this.selectedFormaPago.ID === 1) {
				this.formaPagoSucursal = true;
			} else if (this.selectedFormaPago.ID === 2) {
				this.formaPagoDomicilio = true;
			} else if (this.selectedFormaPago.ID === 3) {
				this.formaPagoDepositoEnCuenta = true;
			} else if (this.selectedFormaPago.ID === 4) {
				this.formaPagoDomicilio = true;
			} else {
				this.formaPagoSucursal = false;
				this.formaPagoDomicilio = false;
				this.formaPagoDepositoEnCuenta = false;
				this.formaPagoDomicilioTribunal = false;
				this.formaPagoTribunal = false;
				this.formaPagoCuentaCorriente = false;
			}
		} catch (error) { }
	}

	ValidarDatos() {
		this.msgs = [];
		try {
			//falta validar campos y validar si va monto o porcentaje
			if (this.ObjectLength(this.model) === 18) {
				this.fechasInvalidas = false;
			} else {
				this.fechasInvalidas = true;
			}
			if (this.fechasInvalidas === false && this.ObjectLength(this.model) === 18 && this.montoInvalido === false && this.selectedAsigFamiliar.ID >= 0 && this.selectedFormaDescuento.ID >= 0 && this.selectedFormaPago.ID >= 0) {
				if (this.formaPagoSucursal === true && this.sucursalSelected.TEXTO.length > 1 && this.model.juez_rj.length > 1) {
					this.permiteIngreso = true;
				} else if (this.formaPagoDomicilio === true && this.model.direccion_rj.length > 1 && this.model.ciudad_rj.length > 1 && this.model.comuna_rj.length > 1 && this.model.juez_rj.length > 1) {
					this.permiteIngreso = true;
				} else if (this.formaPagoDepositoEnCuenta === true && this.selectedBanco.TEXTO.length > 1 && this.model.nro_cuenta_rj.toString().length > 1 && this.model.juez_rj.length > 1) {
					this.permiteIngreso = true;
				} else if (this.selectedFormaPago.TEXTO.indexOf("Tribu") !== -1 && this.model.juez_rj.length > 1) {
					this.permiteIngreso = true;
				} else {
					this.permiteIngreso = false;
					this.fechasInvalidas = true;
					this.showWarnViaMessagesString('Porfavor, valide campos del formulario antes de continuar.');
				}
			} else {
				this.permiteIngreso = false;
				this.fechasInvalidas = true;
				this.showWarnViaMessagesString('Porfavor, valide campos del formulario antes de continuar.');
			}
		} catch (error) {
			this.permiteIngreso = false;
			this.fechasInvalidas = true;
			this.showWarnViaMessagesString('Porfavor, valide campos del formulario antes de continuar.');
		}
	}

	IngresoRetencionJudicial() {
		this.CheckRetJudicial();
	}

	Volver() {
		try {
			this.msgs = [];
			this.model = {};
			this.permiteIngreso = false;
			this.validarIngreso = true;
			this.seleccionoBeneficiario = false;
			this.selectedBeneficiarios = null;
			this.selectedBeneficiarioRj = null;
			this.selectedFormaDescuento = null;
			this.selectedFormaPago = null;
			this.selectedAsigFamiliar = null;
			this.selectedBanco = null;
			this.mensajeRjExitoso = '';
			this.model.fecha_recepcion = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.model.fecha_emision = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.fechasInvalidas = false;
			this.formaPagoSucursal = false;
			this.formaPagoDomicilio = false;
			this.formaPagoDepositoEnCuenta = false;
			this.formaPagoDomicilioTribunal = false;
			this.formaPagoTribunal = false;
			this.guardoCorrectamente = false;
			this.formaPagoCuentaCorriente = false;
			this.model.mes_inicio =
				new Date(this.periodoActual).getFullYear().toString() +
				'-' +
				this.padLeft((new Date(this.periodoActual).getMonth() + 1).toString(), '0', 2);
			this.periodoActualNumber = Number(
				new Date(this.periodoActual).getFullYear().toString() + this.padLeft((new Date(this.periodoActual).getMonth() + 1).toString(), '0', 2)
			);
			this.esconderRecepcionExitoso = false;
			this.mostrarIframe = false;
		} catch (error) { }
	}

	ObtenerDatosControlDocto() {
		try {
			if (this.poliza) {
				this.retencionJudicialService.ObtieneDatosControlDocto().subscribe((datos: ObtieneDatosControlDoctoResponse[]) => {
					if (datos === [] || datos.length === 0) {
						// console.log('no existe datos control documento');
					} else {
						this.controlDoctoResponse = datos[0];
						// console.log(datos);
					}
				});
			}
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
						this.ObtenerDatosCausante();
						this.ObtienePeriodoActual();
						this.ObtenerDatosEjecutivo();
						this.ObtieneListaGrupoPagoBeneficiarios();
						this.ObtieneListaBancos();
						this.ObtieneListaFormaDescuento();
						this.ObtieneListaFormaPago();
						this.ObtieneListaAsigFamiliar();
						this.ObtieneSucursales();
						this.ObtenerDatosControlDocto();
					}
				});
			}
		} catch (error) {
			// console.log(error);
		}
	}

	CambioFormaDescuento() {
		try {
			this.habilitarMonto = false;
			this.habilitarPorcentaje = false;
			this.model.porcentaje_rj = null;
			this.model.monto_rj = null;
			if (this.selectedFormaDescuento.ID === 1) {
				this.habilitarPorcentaje = true;
			} else if (this.selectedFormaDescuento.ID === 2) {
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 3) {
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 4) {
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 5) {
				this.habilitarPorcentaje = true;
			} else if (this.selectedFormaDescuento.ID === 6) {
				this.habilitarPorcentaje = true;
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 7) {
				this.habilitarPorcentaje = true;
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 8) {
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 9) {
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 10) {
				this.habilitarMonto = true;
			} else if (this.selectedFormaDescuento.ID === 11) {
				this.habilitarMonto = true;
			} else {
				this.habilitarMonto = false;
				this.habilitarPorcentaje = false;
			}
		} catch (error) { }
	}

	ValidaPorcentaje() {
		try {
			this.msgs = [];
			if (this.selectedFormaDescuento.ID === 1 || this.selectedFormaDescuento.ID === 5 || this.selectedFormaDescuento.ID === 6 || this.selectedFormaDescuento.ID === 7) {
				//sueldo liquido)
				let validaporcentajeString = '0';
				let validaPorcentajeNumber = 0;
				validaporcentajeString = parseFloat(this.model.porcentaje_rj.toString()).toFixed(2);
				validaPorcentajeNumber = Number(validaporcentajeString);

				if (validaPorcentajeNumber === 0) {
					this.showWarnViaMessagesString('el porcentaje debe ser mayor a 0.');
					this.fechasInvalidas = true;
					this.model.porcentaje_rj = undefined;
					return;
				}
				if (validaPorcentajeNumber > 100) {
					this.showWarnViaMessagesString('Solo puede distribuir el 100% del porcentaje.');
					this.fechasInvalidas = true;
					this.model.porcentaje_rj = undefined;
					return;
				} else {
					this.model.porcentaje_rj = validaPorcentajeNumber;
					this.fechasInvalidas = false;
				}
			} else {
				this.fechasInvalidas = false;
			}
		} catch (error) { }
	}
	ValidaMonto() {
		this.msgs = [];
		try {
			if (this.selectedFormaDescuento.ID === 1 || this.selectedFormaDescuento.ID === 5) {
				this.montoInvalido = false;
				this.fechasInvalidas = false;
			} else {
				if (this.selectedFormaDescuento.ID === 3 || this.selectedFormaDescuento.ID === 4  || this.selectedFormaDescuento.ID === 7 || this.selectedFormaDescuento.ID === 9
					|| this.selectedFormaDescuento.ID === 10 || this.selectedFormaDescuento.ID === 11) {
					if (Number(this.model.monto_rj) === 0) {
						this.showWarnViaMessagesString('El monto debe ser mayor a 0.');
						this.montoInvalido = true;
						this.fechasInvalidas = true;
						this.model.monto_rj = undefined;
						return;
					}
					if (Number(this.model.monto_rj) > this.pensionImponible) {
						this.showWarnViaMessagesString('El monto debe ser inferior o igual a la Pensión de referencia.');
						this.montoInvalido = true;
						this.fechasInvalidas = true;
						this.model.monto_rj = undefined;
						return;
					} else {
						this.montoInvalido = false;
						this.fechasInvalidas = false;
					}
				} else {
					if (Number(this.model.monto_rj) === 0) {
						this.showWarnViaMessagesString('El monto debe ser mayor a 0.');
						this.montoInvalido = true;
						this.fechasInvalidas = true;
						this.model.monto_rj = undefined;
					}
				}
			}
		} catch (error) { }
	}

	ObtieneMontoPensionVejInv() {
		try {
			if (this.poliza) {
				this.ObtieneMontoPensionVejInvRequest.P_POL = this.poliza;
				this.ObtieneMontoPensionVejInvRequest.P_GRP = this.selectedBeneficiarios[0].GRP_GRUPO;
				this.retencionJudicialService
					.ObtieneMontoPensionVejInv(this.ObtieneMontoPensionVejInvRequest)
					.subscribe((datos: ObtienePensionVejInvResponse[]) => {
						if (datos === [] || datos.length === 0) {
							this.CheckTieneGarantiaEstatal();
						} else {
							this.ObtieneMontoPensionVejInvResponse = datos[0];
							this.pensionImponible = this.ObtieneMontoPensionVejInvResponse.MONTO;
							if (this.pensionImponible === 0) {
								this.CheckTieneGarantiaEstatal();
							}
						}
					});
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneMontoPensionSobre() {
		try {
			if (this.poliza) {
				this.ObtieneMontoPensionSobreRequest.P_POL = this.poliza;
				this.ObtieneMontoPensionSobreRequest.P_GRP = this.selectedBeneficiarios[0].GRP_GRUPO;
				this.ObtieneMontoPensionSobreRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;

				this.retencionJudicialService
					.ObtieneMontoPensionSobre(this.ObtieneMontoPensionSobreRequest)
					.subscribe((datos: ObtienePensionSobreResponse[]) => {
						if (datos === [] || datos.length === 0) {
							this.CheckTieneGarantiaEstatal();
						} else {
							this.ObtieneMontoPensionSobreResponse = datos[0];
							this.pensionImponible = this.ObtieneMontoPensionSobreResponse.MONTO;
							if (this.pensionImponible === 0) {
								this.CheckTieneGarantiaEstatal();
							}
						}
					});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	CheckRetJudicial() {
		try {
			this.msgs = [];

			if (this.poliza) {
				this.CheckRetJudicialRequest.P_POL = Number(this.poliza);
				this.CheckRetJudicialRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;
				this.CheckRetJudicialRequest.P_BENRJ = this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.model.rut_receptor));
				this.CheckRetJudicialRequest.P_EXPEDIENTE = this.model.expediente_rj;

				this.retencionJudicialService.CheckRetJudicial(this.CheckRetJudicialRequest).subscribe((datos: CheckRetJudicialResponse[]) => {
					if (datos === [] || datos.length === 0) {
					} else {
						this.CheckRetJudicialResponse = datos[0];
						if (this.CheckRetJudicialResponse.CANT > 0) {
							this.showWarnViaMessagesString('Ya existe una retención con estos datos en el sistema esperando por aprobación.');
						} else {
							this.AgregaRj();
						}
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}

	ObtienePeriodoActual() {
		try {
			if (this.poliza) {
				this.retencionJudicialService.ObtienePeriodoActual().subscribe((datos: ObtienePeriodoActualResponse[]) => {
					if (datos === [] || datos.length === 0) {
					} else {
						this.ObtienePeriodoActualResponse = datos[0];
						this.periodoActual = this.ObtienePeriodoActualResponse.FECHA;
						const fechaPeriodo = new Date(this.periodoActual);
						this.model.mes_inicio =
							new Date(this.periodoActual).getFullYear().toString() +
							'-' +
							this.padLeft((new Date(this.periodoActual).getMonth() + 1).toString(), '0', 2);
						this.periodoActualNumber = Number(
							new Date(this.periodoActual).getFullYear().toString() +
							this.padLeft((new Date(this.periodoActual).getMonth() + 1).toString(), '0', 2)
						);
					}
				});
			} else {
			}
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
					// console.log('no existe datos causante');
				} else {
					this.datosCausanteResponse = datos[0];
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtenerDatosEjecutivo() {
		try {
			this.datosEjecutivoRequest.IDEJECUTIVO = this.idUsuario;
			this.cuotaMortuariaService.ObtieneDatosEjecutivo(this.datosEjecutivoRequest).subscribe((datos: DatosEjecutivoResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no existe datos ejecutivo');
				} else {
					this.datosEjecutivoResponse = datos[0];
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	AbrirRecepcionDeDocumentos() {
		try {
			this.msgs = [];

			if (this.selectedBeneficiarios.length > 1) {
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
				this.selectedBeneficiarios[0].NAT_NUMRUT +
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
				this.selectedBeneficiarios[0].GRP_GRUPO + //lista grupos familiares
				'&crut=' +
				this.selectedBeneficiarios[0].NAT_NUMRUT + //lista rut grupo familiar  rut beneficiario
				'&cpar=' +
				this.selectedBeneficiarios[0].ID_RELACION + //lista cod relacion grupo familiar
				'&cnom=' +
				this.selectedBeneficiarios[0].NAT_NOMBRE +
				' ' +
				this.selectedBeneficiarios[0].NAT_AP_PAT +
				' ' +
				this.selectedBeneficiarios[0].NAT_AP_MAT + //lista NOMBRES grupo familiar   nombre beneficiario
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

	RespuestaRecepcionDoctos() {
		try {
			this.msgs = [];
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
					this.selectedBeneficiarios[0].NAT_NUMRUT;

				this.Subscription = this.cuotaMortuariaService.ObtieneRespuestaRecepcionDoctos(parametrosRespuesta).subscribe((datos) => {
					if (this.cierreModalRecepcionDocto === true) {
						if (datos > 0) {
							this.datosRespuestaRecepcionDoctos = datos;
							this.showWarnViaMessages(1);
							this.Subscription.unsubscribe();
							this.generoRemesable = true;
							this.esconderRecepcionExitoso = true;
						} else {
							this.showWarnViaMessages(3);
							this.generoRemesable = false;
							this.esconderRecepcionExitoso = false;
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

	GuardarPersona() {
		try {
			this.msj_persona = '';
			if (this.marcaPersona === 1) {
				this.model.rut_receptor = this.rutproperties.transform(this.model.rut_beneficiario.toString());
				this.model.nombre_receptor = this.model.nombre_beneficiario + ' ' + this.model.apellido_paterno + ' ' + this.model.apellido_materno;
				this.CerrarModalPersona();
				return;
			}
			if (this.model.rut_beneficiario.length > 0 && this.model.nombre_beneficiario.length > 0 && this.model.apellido_paterno.length > 0 && this.model.apellido_materno.length > 0 && this.model.rut_dv_beneficiario.length > 0) {

				const nombreCompleto = this.model.nombre_beneficiario + " " + this.model.apellido_paterno + " " + this.model.apellido_materno;
				if (nombreCompleto.length <= 60) {
					const rutBeneficiario = this.rutproperties.rutClean(this.model.rut_beneficiario);
					this.model.rut_dv_beneficiario = this.rutproperties.devuelveDigito(rutBeneficiario);

					this.guardarPersona.P_NOMBRE = this.model.nombre_beneficiario;
					this.guardarPersona.P_APE_PAT = this.model.apellido_paterno;
					this.guardarPersona.P_APE_MAT = this.model.apellido_materno;
					this.guardarPersona.P_RUT = this.rutproperties.rutSinDigito(rutBeneficiario);
					this.guardarPersona.P_DV = this.model.rut_dv_beneficiario;

					this.cuotaMortuariaService.GuardarPersona(this.guardarPersona).subscribe((datos: PersonaGuardarResponse) => {
						if (datos.P_RESULTADO === null || datos.P_RESULTADO === undefined) {
							// console.log('hubo problemas al guardar persona');
						} else {
							this.guardarPersonaResponse = datos;
							if (this.guardarPersonaResponse.P_RESULTADO === 1 || datos.P_RESULTADO === -1) {
								this.model.rut_receptor = this.guardarPersona.P_RUT.toString() + this.guardarPersona.P_DV.toString();
								this.model.rut_receptor = this.rutproperties.transform(this.model.rut_receptor);
								this.model.nombre_receptor =
									this.guardarPersona.P_NOMBRE + ' ' + this.guardarPersona.P_APE_PAT + ' ' + this.guardarPersona.P_APE_MAT;
								this.displayBuscaPersona = false;
								const rutClean = this.rutproperties.rutClean(this.model.rut_receptor);
								//const rutCleanNumber = rutClean;
								this.ObtienePersona(rutClean);
							}
						}
						// console.log(datos);
					});
				} else {
					alert("Error, supera el largo maximo de 60 caracteres el nombre completo, Por favor Corregir");
				}
			} else {
				alert("Error, debe ingresar todos los datos para ingresar una nueva persona");
			}
		} catch (error) { }
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

	ObtienePersona(rutPersona) {
		try {
			if (rutPersona !== null && rutPersona !== undefined) {

				if (!/^[0-9]+[0-9kK]{1}$/.test(rutPersona.toString())) {
					alert("formato rut invalido ej: 77.777.777");
					this.model.rut_beneficiario = null;
					return;
				}
				if (this.rutproperties.checkRut(rutPersona.toString())) {
					const rutReceptor = this.rutproperties.rutClean(rutPersona.toString());
					this.personaRequest.P_PRUT = parseInt(this.rutproperties.rutSinDigito(rutReceptor).toString());

					this.cuotaMortuariaService.ObtienePersona(this.personaRequest).subscribe((datos: Persona[]) => {
						if (datos === [] || datos.length === 0) {
							this.msj_persona = "Persona no existe.Por favor,llene los campos solicitados";
							this.GuardarOseleccionar = 'Guardar';
							this.marcaPersona = 0;
						} else {
							this.msj_persona = '';
							this.marcaPersona = 1;
							this.GuardarOseleccionar = 'Seleccionar';
							this.persona = datos[0];
							this.model.apellido_paterno = this.persona.NAT_AP_PAT;
							this.model.apellido_materno = this.persona.NAT_AP_MAT;
							this.model.nombre_beneficiario = this.persona.NAT_NOMBRE;
							// console.log(this.persona);
						}
					});
				} else {
					alert("El rut ingresado es incorrecto ");
					this.model.rut_beneficiario = null;
				}
			}
		} catch (error) {
			// console.log(error);
		}
	}

	closeModal() {
		this.cierreModalRecepcionDocto = true;
	}

	ActualizaCargaRj() {
		try {
			this.ActualizaCargaRjRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.ActualizaCargaRjRequest.P_CARGA = 0; //falta aclarar
			this.ActualizaCargaRjRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.ActualizaCargaRjRequest.P_CORR_RJ = this.ObtieneSecuenciaResponse.P_RESULTADO;
			this.ActualizaCargaRjRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.ActualizaCargaRjRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.ActualizaCargaRjRequest.P_POLIZA = this.poliza;
			this.ActualizaCargaRjRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService.ActualizaCargaRj(this.ActualizaCargaRjRequest).subscribe((datos: ActualizaCargaRjResponse) => {
				if (datos === null || datos === undefined) {
					// console.log('no se pudo actualizar carga rj');
				} else {
					this.ActualizaCargaRjResponse = datos;
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	AgregaRj() {
		try {
			this.msgs = [];
			let bancoSelected = undefined;
			let sucursalSelected = undefined;
			if (this.selectedBanco === undefined) {
				bancoSelected = undefined;
			} else {
				bancoSelected = this.selectedBanco.ID;
			}
			if (this.sucursalSelected === undefined) {
				sucursalSelected = undefined;
			} else {
				sucursalSelected = this.sucursalSelected.ID;
			}
			if (this.model.nro_cuenta_rj === undefined) {
			} else {
				this.model.nro_cuenta_rj = Number(this.model.nro_cuenta_rj);
			}
			this.AgregaRjRequest.P_BCO_NN = bancoSelected;
			this.AgregaRjRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.AgregaRjRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.AgregaRjRequest.P_CIU = this.model.ciudad_rj;
			this.AgregaRjRequest.P_CMN = this.model.comuna_rj;
			this.AgregaRjRequest.P_CORR = this.ObtieneSecuenciaResponse.P_RESULTADO;
			this.AgregaRjRequest.P_CTA_CR = this.model.nro_cuenta_rj;
			this.AgregaRjRequest.P_DIR = this.model.direccion_rj;
			this.AgregaRjRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.AgregaRjRequest.P_FEC_EMI = this.model.fecha_emision;
			this.AgregaRjRequest.P_FEC_RCP = this.model.fecha_recepcion;
			this.AgregaRjRequest.P_FORMA_PAGO = this.selectedFormaPago.ID;
			this.AgregaRjRequest.P_FRM = this.selectedFormaDescuento.ID;
			this.AgregaRjRequest.P_GRUPO = this.selectedBeneficiarios[0].GRP_GRUPO;
			this.AgregaRjRequest.P_ID_BEN_RJ = this.persona.NAT_ID;
			this.AgregaRjRequest.P_JUEZ = this.model.juez_rj;
			this.AgregaRjRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.AgregaRjRequest.P_MES_INI = Number(this.periodoActualNumber);
			this.AgregaRjRequest.P_MTO = Number(this.model.monto_rj);
			this.AgregaRjRequest.P_NRO_EXP = this.model.expediente_rj;
			this.AgregaRjRequest.P_POLIZA = this.poliza;
			this.AgregaRjRequest.P_PRC = Number(this.model.porcentaje_rj);
			this.AgregaRjRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;
			this.AgregaRjRequest.P_RST = 2;
			this.AgregaRjRequest.P_SUC_TA = sucursalSelected;

			this.retencionJudicialService.AgregarRj(this.AgregaRjRequest).subscribe((datos: AgregaRjResponse) => {
				if (datos === null || datos === undefined) {
					// console.log('no se pudo agregar rj');
				} else {
					this.AgregaRjResponse = datos;
					if (this.AgregaRjResponse.P_RESULTADO === 0) {
						this.showWarnViaMessagesString('No pudo ingresarse la Retencion Judicial de manera correcta.');
						this.guardoCorrectamente = false;
						return;
					}
					if (this.AgregaRjResponse.P_RESULTADO !== 0 && this.fechasInvalidas === false) {
						this.ObtieneValidacionFecha();
					}
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	BorraRetencionJudicial() {
		try {
			this.BorraRetencionJudicialRequest.P_CORR = this.ObtieneSecuenciaResponse.P_RESULTADO;
			this.BorraRetencionJudicialRequest.P_TIPO = this.polizaResponse.SIN_TIPO;
			this.BorraRetencionJudicialRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.BorraRetencionJudicialRequest.P_USER = this.datosEjecutivoResponse.USUARIODATABASE;
			this.BorraRetencionJudicialRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.BorraRetencionJudicialRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.BorraRetencionJudicialRequest.P_POLIZA = this.poliza;
			this.BorraRetencionJudicialRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService
				.BorraRetencionJudicial(this.BorraRetencionJudicialRequest)
				.subscribe((datos: BorraRetencionJudicialResponse) => {
					if (datos === null || datos === undefined) {
						// console.log('no se pudo borrar retencion judicial ');
					} else {
						this.BorraRetencionJudicialResponse = datos;
						// console.log(datos);
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}

	CheckRetJud() {
		try {
			this.CheckRetJudRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.CheckRetJudRequest.P_BENEFICIARIO_RJ = this.persona.NAT_ID;
			this.CheckRetJudRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.CheckRetJudRequest.P_EXPEDIENTE = this.model.expediente_rj;
			this.CheckRetJudRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.CheckRetJudRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.CheckRetJudRequest.P_POLIZA = this.poliza;
			this.CheckRetJudRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService.CheckRetJud(this.CheckRetJudRequest).subscribe((datos: CheckRetJudResponse) => {
				if (datos === null || datos === undefined) {
					// console.log('no se pudo check retencion judicial');
				} else {
					this.CheckRetJudResponse = datos;
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneListaRj() {
		try {
			this.CheckRetJudRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.CheckRetJudRequest.P_BENEFICIARIO_RJ = this.persona.NAT_ID;
			this.CheckRetJudRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.CheckRetJudRequest.P_EXPEDIENTE = this.model.expediente_rj;
			this.CheckRetJudRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.CheckRetJudRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.CheckRetJudRequest.P_POLIZA = this.poliza;
			this.CheckRetJudRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService.ObtieneListaRj(this.ObtieneListaRjRequest).subscribe((datos: ObtieneListaRjResponse[]) => {
				if (datos === null || datos === undefined) {
					// console.log('no se pudo obtener lista rj');
				} else {
					this.ObtieneListaRjResponse = datos;
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneListaRjParaEliminar() {
		try {
			this.CheckRetJudRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.CheckRetJudRequest.P_BENEFICIARIO_RJ = this.persona.NAT_ID;
			this.CheckRetJudRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.CheckRetJudRequest.P_EXPEDIENTE = this.model.expediente_rj;
			this.CheckRetJudRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.CheckRetJudRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.CheckRetJudRequest.P_POLIZA = this.poliza;
			this.CheckRetJudRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService
				.ObtieneListaRjParaEliminar(this.ObtieneListaRjParaEliminarRequest)
				.subscribe((datos: ObtieneListaRjParaEliminarResponse[]) => {
					if (datos === null || datos === undefined) {
						// console.log('no se pudo obtener lista rj para eliminar');
					} else {
						this.ObtieneListaRjParaEliminarResponse = datos;
						// console.log(datos);
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneRetencionesJudiciales() {
		try {
			this.CheckRetJudRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.CheckRetJudRequest.P_BENEFICIARIO_RJ = this.persona.NAT_ID;
			this.CheckRetJudRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.CheckRetJudRequest.P_EXPEDIENTE = this.model.expediente_rj;
			this.CheckRetJudRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.CheckRetJudRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.CheckRetJudRequest.P_POLIZA = this.poliza;
			this.CheckRetJudRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService
				.ObtieneRetencionesJudiciales(this.ObtieneRetencionesJudicialesRequest)
				.subscribe((datos: ObtieneRetencionesJudResponse[]) => {
					if (datos === null || datos === undefined) {
						// console.log('no se pudo obtener lista retenciones judiciales');
					} else {
						this.ObtieneRetencionesJudicialesResponse = datos;
						// console.log(datos);
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneSecuenciaRj() {
		try {
			this.CheckRetJudRequest.P_BENEFICIARIO = this.selectedBeneficiarios[0].NAT_ID;
			this.CheckRetJudRequest.P_BENEFICIARIO_RJ = this.persona.NAT_ID;
			this.CheckRetJudRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.CheckRetJudRequest.P_EXPEDIENTE = this.model.expediente_rj;
			this.CheckRetJudRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.CheckRetJudRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.CheckRetJudRequest.P_POLIZA = this.poliza;
			this.CheckRetJudRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.retencionJudicialService.ObtieneSecuenciaRj().subscribe((datos: ObtieneSecuenciaRjResponse) => {
				if (datos === null || datos === undefined) {
					// console.log('no se pudo obtener secuencia rj');
				} else {
					this.ObtieneSecuenciaResponse = datos;
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneListaFormaDescuento() {
		try {
			this.retencionJudicialService.ObtieneListaFormaDescuento().subscribe((datos: ObtieneListaFormaDescuentos[]) => {
				this.ObtieneListaFormaDescuentoResponse = datos;
			});
		} catch (error) { }
	}

	ObtieneListaFormaPago() {
		try {
			this.retencionJudicialService.ObtieneListaFormaPago().subscribe((datos: ObtieneListaFormaPagos[]) => {
				this.ObtieneListaFormaPagoResponse = datos;
			});
		} catch (error) { }
	}

	ObtieneListaAsigFamiliar() {
		try {
			this.retencionJudicialService.ObtieneListaAsigFamiliar().subscribe((datos: ObtieneListaAsigFamiliar[]) => {
				this.ObtieneListaAsigFamiliarResponse = datos;
			});
		} catch (error) { }
	}

	ObtieneListaBancos() {
		try {
			this.retencionJudicialService.ObtieneListaBancos().subscribe((datos: ObtieneListaBancos[]) => {
				this.ObtieneListaBancosResponse = datos;
			});
		} catch (error) { }
	}

	ObtieneValidacionFecha() {
		try {
			this.msgs = [];
			this.retencionJudicialService.ObtieneValidacionFecha().subscribe((datos: ObtieneValidacionFechaResponse) => {
				if (datos.P_RESULTADO === null || datos.P_RESULTADO === undefined) {
					// console.log('valida fechas incorrecto');
				} else {
					this.ObtieneValidacionFechaResponse = datos;
					if (this.ObtieneValidacionFechaResponse.P_RESULTADO === 0) {
						this.mensajeRjExitoso = 'La Retencion Judicial ha sido ingresada correctamente.';
						this.guardoCorrectamente = true;
						this.seleccionoBeneficiario = false;
						this.validarIngreso = false;
						this.permiteIngreso = false;
						this.esconderRecepcionExitoso = false;
						return;
					}
					if (this.ObtieneValidacionFechaResponse.P_RESULTADO > 0) {
						this.mensajeRjExitoso = 'Transacción quedará efectiva para el próximo mes.';
						this.guardoCorrectamente = true;
						this.permiteIngreso = false;
						this.seleccionoBeneficiario = false;
						this.validarIngreso = false;
						this.esconderRecepcionExitoso = false;
						return;
					}
				}
			});
		} catch (error) { }
	}

	ObtieneBonoMontoMinimoPension() {
		try {
			this.ObtieneBonoMontoMinimoPensionRequest.P_ASE = this.datosCausanteResponse.NAT_ID;
			this.ObtieneBonoMontoMinimoPensionRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;
			this.ObtieneBonoMontoMinimoPensionRequest.P_PER = this.periodoActualNumber;
			this.ObtieneBonoMontoMinimoPensionRequest.P_POL = this.poliza;
			this.ObtieneBonoMontoMinimoPensionRequest.P_PRD = this.polizaResponse.POL_PRODUCTO;
			this.ObtieneBonoMontoMinimoPensionRequest.P_RELACION = this.selectedBeneficiarios[0].ID_RELACION;

			this.retencionJudicialService
				.ObtieneBonoMontoMinimo(this.ObtieneBonoMontoMinimoPensionRequest)
				.subscribe((datos: ObtieneBonoMontoMinimoPensionResponse[]) => {
					if (datos === null || datos === undefined || datos.length === 0) {
						// console.log('no se pudo obtener bono monto minimo');
					} else {
						this.ObtieneBonoMontoMinimoPensionResponse = datos[0];
						this.CalculoMonto();
						// console.log(datos);
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}

	ObtieneMontoMinimoPension() {
		try {
			this.ObtieneMontoMinimoPensionRequest.P_ASE = this.datosCausanteResponse.NAT_ID;
			this.ObtieneMontoMinimoPensionRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;
			this.ObtieneMontoMinimoPensionRequest.P_PER = this.periodoActualNumber;
			this.ObtieneMontoMinimoPensionRequest.P_POL = this.poliza;
			this.ObtieneMontoMinimoPensionRequest.P_PRD = this.polizaResponse.POL_PRODUCTO;
			this.ObtieneMontoMinimoPensionRequest.P_RELACION = this.selectedBeneficiarios[0].ID_RELACION;

			this.retencionJudicialService
				.ObtieneMontoMinimo(this.ObtieneMontoMinimoPensionRequest)
				.subscribe((datos: ObtieneMontoMinimoPensionResponse[]) => {
					if (datos === null || datos === undefined || datos.length === 0) {
						// console.log('no se pudo obtener monto minimo pension');
					} else {
						this.ObtieneMontoMinimoPensionResponse = datos[0];
						// console.log(datos);
						this.CalculoMonto();
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}

	CalculoMonto() {
		let montoGE = 0;
		let pMinMtoMenor70 = 0;
		let pMinMtoMayor70 = 0;
		let bonoMenor70 = 0;
		let bonoMayor70 = 0;
		let bonoMayor75 = 0;
		let pMinMtoMayor75 = 0;
		/* primero recuperar el estado GE */
		try {
			if (this.ObtieneEstadoGeResponse.ESTADOGE != null && this.ObtieneEstadoGeResponse.ESTADOGE !== '') {
				/* Sacar los montos */
			} else if (this.ObtieneMontoMinimoPensionResponse === null) {
				/* No hay datos */
				this.pensionImponible = montoGE;
				return;
			}
			/* sacamos el primero que es el de la fecha mayor*/
			pMinMtoMenor70 = this.ObtieneMontoMinimoPensionResponse.PMIN_MTO_MENOR_70;
			pMinMtoMayor70 = this.ObtieneMontoMinimoPensionResponse.PMIN_MTO_MAYOR_70;
			pMinMtoMayor75 = this.ObtieneMontoMinimoPensionResponse.PMIN_MTO_MTO_MAYOR_75;
			if (pMinMtoMenor70 === null || pMinMtoMenor70 === undefined) pMinMtoMenor70 = 0;
			if (pMinMtoMayor70 === null || pMinMtoMayor70 === undefined) pMinMtoMayor70 = 0;
			if (pMinMtoMayor75 === null || pMinMtoMayor75 === undefined) pMinMtoMayor75 = 0;
			/* ahora las bonificaciones */

			if (this.ObtieneBonoMontoMinimoPensionResponse !== null) {
				/* sacamos el primero que es el de la fecha mayor*/
				bonoMenor70 = this.ObtieneBonoMontoMinimoPensionResponse.BON_MTO_MENOR_70;
				bonoMayor70 = this.ObtieneBonoMontoMinimoPensionResponse.BON_MTO_MENOR_70;
				bonoMayor75 = this.ObtieneBonoMontoMinimoPensionResponse.BON_MTO_MENOR_70;
			}
			if (bonoMenor70 === null || bonoMenor70 === undefined) {
				bonoMenor70 = 0;
			}
			if (bonoMayor70 === null || bonoMayor70 === undefined) {
				bonoMayor70 = 0;
			}
			if (bonoMayor75 === null || bonoMayor75 === undefined) {
				bonoMayor75 = 0;
			}
			if (this.selectedBeneficiarios[0].EDAD >= 75) {
				montoGE = pMinMtoMayor75 + bonoMayor75;
			} else if (this.selectedBeneficiarios[0].EDAD >= 70 && this.selectedBeneficiarios[0].EDAD < 75) {
				montoGE = pMinMtoMayor70 + bonoMayor70;
			} else {
				montoGE = pMinMtoMenor70 + bonoMenor70;
			}
		} catch (error) {
			// console.log(error);
		}
		this.pensionImponible = montoGE;
		return;
	}

	ObtieneEstadoGe() {
		try {
			this.ObtieneEstadoGeRequest.P_POLIZA = this.poliza;
			this.ObtieneEstadoGeRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;

			this.retencionJudicialService.ObtieneEstadoGe(this.ObtieneEstadoGeRequest).subscribe((datos: ObtenerEstadoGeResponse[]) => {
				if (datos === null || datos === undefined || datos.length === 0) {
					this.ObtieneEstadoGeResponse.ESTADOGE = null;
				} else {
					this.ObtieneEstadoGeResponse = datos[0];
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	CheckTieneGarantiaEstatal() {
		try {
			this.CheckTieneGarantiaEstatalRequest.P_BEN = this.selectedBeneficiarios[0].NAT_ID;
			this.CheckTieneGarantiaEstatalRequest.P_POLIZA = this.poliza;

			this.retencionJudicialService
				.CheckTieneGarantiaEstatal(this.CheckTieneGarantiaEstatalRequest)
				.subscribe((datos: CheckTieneGarantiaEstatalResponse[]) => {
					if (datos === null || datos === undefined) {
						// console.log('no se pudo obtener si tiene ge');
					} else {
						this.CheckTieneGarantiaEstatalResponse = datos[0];
						if (this.CheckTieneGarantiaEstatalResponse.CGEEST === 0) {
							this.ObtieneEstadoGe();
							this.ObtieneMontoMinimoPension();
							this.ObtieneBonoMontoMinimoPension();
						}
						// console.log(datos);
					}
				});
		} catch (error) {
			// console.log(error);
		}
	}

	padLeft(text: string, padChar: string, size: number): string {
		return String(padChar).repeat(size - text.length) + text;
	}
}
