import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
import { AgregaPoder, AgregaPoderResponse } from 'src/app/models/ingresoPoderes/agrega-poder.model';
import { AnulaUltimoPoder, AnulaUltimoPoderResponse } from 'src/app/models/ingresoPoderes/anula-ultimo-poder.model';
import { CheckPoder, CheckPoderResponse } from 'src/app/models/ingresoPoderes/check-poder.model';
import { CuotaMortuariaService } from 'src/app/services/cuota-mortuaria.service';
import { GarantiaEstatalService } from 'src/app/services/garantia-estatal.service';
import { IngresoPoderesService } from 'src/app/services/ingreso-poderes.service';
import { ObtieneTiposPoderesResponse } from 'src/app/models/ingresoPoderes/obtiene-tipos-poderes.model';
import { ObtieneListaPoderes, ObtieneListaPoderesResponse } from 'src/app/models/ingresoPoderes/obtiene-lista-poderes.model';
import { BorraPoderes, BorraPoderesResponse } from 'src/app/models/ingresoPoderes/borra-poderes.model';
import { AutorizaPoderMfp, AutorizaPoderMfpResponse } from 'src/app/models/ingresoPoderes/autoriza-poder-mfp.model';
import { IngresaPoderMfp, IngresaPoderMfpResponse } from 'src/app/models/ingresoPoderes/ingresa-poder-mfp.model';
import {
	ObtieneListaGrupoPagoBeneficiariosRequest,
	ObtieneListaGrupoPagoBeneficiariosResponse,
} from 'src/app/models/garantiaEstatal/lista-grupo-pago-poliza.model';
import { FormatRutPipe } from 'src/app/utilities/format-rut.pipe';
import { AppConfig } from 'src/app/services/appconfig';
import { ObtieneDatosControlDocto, ObtieneDatosControlDoctoResponse } from 'src/app/models/ingresoPoderes/obtiene-datos-control-docto.model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-ingreso-poderes',
	templateUrl: './ingreso-poderes.component.html',
	styleUrls: ['./ingreso-poderes.component.scss'],
})
export class IngresoPoderesComponent implements OnInit {
	datosEjecutivoRequest: DatosEjecutivo = new DatosEjecutivo();
	datosEjecutivoResponse: DatosEjecutivoResponse = new DatosEjecutivoResponse();
	datosCausanteRequest: PersonaCausanteRequest = new PersonaCausanteRequest();
	datosCausanteResponse: PersonaCausanteResponse = new PersonaCausanteResponse();
	polizaRequest: Poliza = new Poliza();
	polizaResponse: PolizaResponse = new PolizaResponse();
	msgs: any[];
	datosRespuestaRecepcionDoctos: string;
	Transaccion: number;
	compañia: string;
	idUsuario: string;
	poliza: number;
	esconderRecepcionExitoso = true;
	checkPoderRequest: CheckPoder = new CheckPoder();
	checkPoderResponse: CheckPoderResponse = new CheckPoderResponse();
	agregaPoderRequest: AgregaPoder = new AgregaPoder();
	agregaPoderResponse: AgregaPoderResponse = new AgregaPoderResponse();
	anulaUltimoPoderRequest: AnulaUltimoPoder = new AnulaUltimoPoder();
	anulaUltimoPoderResponse: AnulaUltimoPoderResponse = new AnulaUltimoPoderResponse();
	obtieneTiposPoderesResponse: ObtieneTiposPoderesResponse[] = [];
	obtieneListaPoderesRequest: ObtieneListaPoderes = new ObtieneListaPoderes();
	obtieneListaPoderesResponse: ObtieneListaPoderesResponse[] = [];
	borraPoderesRequest: BorraPoderes = new BorraPoderes();
	borraPoderesResponse: BorraPoderesResponse = new BorraPoderesResponse();
	autorizaPoderesMfp: AutorizaPoderMfp = new AutorizaPoderMfp();
	autorizaPoderesMfpResponse: AutorizaPoderMfpResponse = new AutorizaPoderMfpResponse();
	ingresaPoderMfpRequest: IngresaPoderMfp = new IngresaPoderMfp();
	ingresaPoderMfpResponse: IngresaPoderMfpResponse = new IngresaPoderMfpResponse();
	ObtieneListaGrupoPagoBeneficiariosRequest: ObtieneListaGrupoPagoBeneficiariosRequest = new ObtieneListaGrupoPagoBeneficiariosRequest();
	ObtieneListaGrupoPagoBeneficiariosResponse: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	selectedBeneficiarios: ObtieneListaGrupoPagoBeneficiariosResponse[] = [];
	validarIngreso = true;
	model: any = {};
	displayBuscaPersona = false;
	personaRequest: PersonaRequest = new PersonaRequest();
	persona: Persona = new Persona();
	guardarPersona: PersonaGuardarRequest = new PersonaGuardarRequest();
	guardarPersonaResponse: PersonaGuardarResponse = new PersonaGuardarResponse();
	SeleccionaTipoPoder = false;
	tipoPoderSelected: ObtieneTiposPoderesResponse = new ObtieneTiposPoderesResponse();
	TipoSuscripcion = false;
	seleccionoBeneficiario = false;
	nombreBeneficiario = '';
	rutBeneficiario = '';
	mensajeUno: { metadata: string };
	mensajeDos: { metadata: string };
	controlDoctoResponse: ObtieneDatosControlDoctoResponse = new ObtieneDatosControlDoctoResponse();
	controlDoctoRequest: ObtieneDatosControlDocto = new ObtieneDatosControlDocto();
	Subscription: Subscription = new Subscription();
	mostrarIframe = false;
	urlSafeAperturaControlDocto: any;
	cierreModalRecepcionDocto = false;
	parametrosApertura = '';
	generoRemesable = false;
	permiteIngreso = false;
	guardoCorrectamente = false;
	isRenovacion = false;
	fechasInvalidas = false;
	GuardarOseleccionar = 'Guardar';
	msj_persona = '';
	marcaPersona = 0;
	constructor(
		private datepipe: DatePipe,
		private rutproperties: FormatRutPipe,
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
					this.ObtieneTiposPoderes();
				}
			});
			this.model.fecha_notificacion = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.model.fecha_suscripcion = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.model.fecha_vencimiento = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
		} catch (error) { }
	}
	Volver() {
		try {
			this.TipoSuscripcion = false;
			this.seleccionoBeneficiario = false;
			this.cierreModalRecepcionDocto = false;
			this.generoRemesable = false;
			this.permiteIngreso = false;
			this.guardoCorrectamente = false;
			this.isRenovacion = false;
			this.fechasInvalidas = false;
			this.validarIngreso = true;
			this.model = {};
			this.displayBuscaPersona = false;
			this.selectedBeneficiarios = [];
			this.tipoPoderSelected = null;
			this.model.fecha_notificacion = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.model.fecha_suscripcion = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.model.fecha_vencimiento = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
			this.msgs = [];
		} catch (error) { }
	}
	SeleccionBeneficiario() {
		try {
			if (this.selectedBeneficiarios.length === 0 || this.selectedBeneficiarios === undefined || this.selectedBeneficiarios.length > 1) {
				this.showWarnViaMessagesString('Seleccione un Registro, Porfavor.');
				return;
			}
			if (this.polizaResponse.SIN_TIPO === 1 && this.selectedBeneficiarios[0].GRP_GRUPO === 0) {
				this.showWarnViaMessagesString('Error, No corresponde ingresar Poder asociado al Causante en Pólizas de Sobrevivencia');
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
			//validar sobreviviencia 1 y si se selecciona causante para no permitir ingresar poder
		} catch (error) { }
	}
	esRenovacion() {
		if (this.TipoSuscripcion === true) {
			if (this.model.tipoSuscripcion === '0') {
				this.isRenovacion = true;
			} else {
				this.isRenovacion = false;
			}
		} else {
			this.isRenovacion = false;
		}
	}
	GuardarRenovarPoder() {
		try {
			if (this.TipoSuscripcion === true) {
				if (this.model.tipoSuscripcion === '0') {
					//this.AnulaUltimoPoder();
					// this.IngresaPoderMfp();
					// this.ObtieneListaPoderes();
					//  this.BorraPoderes();
					this.CheckPoder();
					return;
				} else {
					this.CheckPoder();
					return;
				}
			} else {
				this.CheckPoder();
				return;
			}
			/*if (this.tipoPoderSelected.ID === 6 || this.tipoPoderSelected.ID === 7) {
	 // this.AutorizaPoderMfp();
	}
	this.CheckPoder();*/
		} catch (error) { }
	}
	ValidaFechas() {
		try {
			let mensajeFechaRenovacionOSuscripcion = '';
			if (this.isRenovacion) {
				mensajeFechaRenovacionOSuscripcion = 'fecha Renovación';
			} else {
				mensajeFechaRenovacionOSuscripcion = 'fecha Suscripción';
			}
			if (this.tipoPoderSelected.ID === 6) {
				mensajeFechaRenovacionOSuscripcion = 'fecha Suscripción';
				const fechaSuscripcion = new Date(this.model.fecha_suscripcion);
				const fechaVencimiento = new Date(this.model.fecha_vencimiento);
				const fechaHoy = new Date();
				if (fechaSuscripcion.getMonth() !== fechaHoy.getMonth()) {
					this.showWarnViaMessagesString(mensajeFechaRenovacionOSuscripcion + ' debe ser el mismo mes que de notificacion');
					this.fechasInvalidas = true;
					return;
				} else {
					if (fechaSuscripcion > fechaHoy) {
						this.showWarnViaMessagesString('fecha de suscripcion debe ser menor o igual a fecha notificacion');
						this.fechasInvalidas = true;
						return;
					}
					if (this.rutproperties.validaFechas(this.model.fecha_notificacion, this.model.fecha_suscripcion, 'suscripcion') === 1) {
						this.showWarnViaMessagesString(
							'diferencia de fecha notificacion y  ' + mensajeFechaRenovacionOSuscripcion + ' no puede ser mayor a 6 meses'
						);
						this.fechasInvalidas = true;
						return;
					}
				}
				if (fechaVencimiento < fechaSuscripcion) {
					this.showWarnViaMessagesString('fecha vencimiento debe ser mayor o igual a la ' + mensajeFechaRenovacionOSuscripcion);
					this.fechasInvalidas = true;
					return;
				}
				if (
					fechaVencimiento >= fechaSuscripcion &&
					this.rutproperties.validaFechas(this.model.fecha_vencimiento, this.model.fecha_suscripcion, 'vencimiento') === 1
				) {
					this.showWarnViaMessagesString('fecha vencimiento debe ser mayor que la fecha suscripcion maximo 1 mes');
					this.fechasInvalidas = true;
					return;
				}
				this.fechasInvalidas = false;
			} else {
				const fechaSuscripcion = new Date(this.model.fecha_suscripcion);
				const fechaHoy = new Date();
				const fechaVencimiento = new Date(this.model.fecha_vencimiento);
				if (fechaSuscripcion.getTime() <= fechaHoy.getTime()) {
					if (this.rutproperties.validaFechas(this.model.fecha_notificacion, this.model.fecha_suscripcion, 'suscripcion') === 1) {
						this.showWarnViaMessagesString(
							'diferencia de fecha notificacion y  ' + mensajeFechaRenovacionOSuscripcion + ' no puede ser mayor a 6 meses'
						);
						this.fechasInvalidas = true;
						return;
					}
				} else {
					this.showWarnViaMessagesString('fecha de ' + mensajeFechaRenovacionOSuscripcion + ' debe ser menor o igual a la de notificacion');
					this.fechasInvalidas = true;
					return;
				}
				if (fechaVencimiento < fechaSuscripcion) {
					this.showWarnViaMessagesString('Fecha de Vencimiento, Debe ser mayor o igual a la fecha de Suscripción o Renovación');
					this.fechasInvalidas = true;
					return;
				}
				if (
					fechaVencimiento >= fechaSuscripcion &&
					this.rutproperties.validaFechas(this.model.fecha_vencimiento, this.model.fecha_suscripcion, 'vencimiento2y') === 1
				) {
					this.showWarnViaMessagesString('fecha vencimiento debe ser mayor que la fecha suscripcion maximo 2 años');
					this.fechasInvalidas = true;
					return;
				}
				this.fechasInvalidas = false;
			}
		} catch (error) { }
	}

	ShowBuscaPersonas() {
		this.displayBuscaPersona = true;
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

	ObtenerDatosControlDocto() {
		try {
			if (this.poliza) {
				this.controlDoctoRequest.P_POLIZA = this.poliza;
				this.controlDoctoRequest.P_IDBEN = this.selectedBeneficiarios[0].NAT_ID;
				this.controlDoctoRequest.P_TIPOPODER = this.tipoPoderSelected.ID;

				this.ingresoPoderesService
					.ObtieneDatosControlDocto(this.controlDoctoRequest)
					.subscribe((datos: ObtieneDatosControlDoctoResponse[]) => {
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

	cambioTipoPoder() {
		if (this.tipoPoderSelected) {
			this.ObtenerDatosControlDocto();
			if (this.tipoPoderSelected.ID === 3 || this.tipoPoderSelected.ID === 5 || this.tipoPoderSelected.ID === 7) {
				this.TipoSuscripcion = true;
			} else {
				this.TipoSuscripcion = false;
			}
			if (this.tipoPoderSelected.ID === 6) {
				this.mensajeUno = AppConfig.settings.CertificadoMedicoMensaje1;
				this.mensajeDos = AppConfig.settings.CertificadoMedicoMensaje2;
				this.SeleccionaTipoPoder = true;
			}
			if (this.tipoPoderSelected.ID === 3) {
				this.mensajeUno = AppConfig.settings.PoderesGeneralesMensaje1;
				this.mensajeDos = AppConfig.settings.PoderesGeneralesMensaje2;
				this.SeleccionaTipoPoder = true;
			}
			if (
				this.tipoPoderSelected.ID === 1 ||
				this.tipoPoderSelected.ID === 2 ||
				this.tipoPoderSelected.ID === 5 ||
				this.tipoPoderSelected.ID === 7
			) {
				this.mensajeUno = AppConfig.settings.OtrosPoderesMensaje1;
				this.mensajeDos = AppConfig.settings.OtrosPoderesMensaje2;
				this.SeleccionaTipoPoder = true;
			}
		} else {
			// console.log('seleccione tipo poder');
		}
	}
	ValidarDatos() {
		try {
			if (this.ObjectLength(this.model) === 11 && this.tipoPoderSelected.ID > 0 || (this.ObjectLength(this.model) === 10 && this.TipoSuscripcion === false && this.tipoPoderSelected.ID > 0)) {
				this.permiteIngreso = true;
				//  this.fechasInvalidas = false;
				this.msgs = [];
			} else {
				this.showWarnViaMessagesString('Porfavor ingrese y/o válide todos los campos del formulario.');
				this.fechasInvalidas = true;
				this.permiteIngreso = false;
			}
		} catch (error) { }
	}
	GuardarPersona() {
		try {
			if (this.marcaPersona = 1) {
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
					alert("Error, supera el largo maximo de 60 caracteres el nombre completo, Por favor Corregir.");
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
							// console.log('no existe registro personas');
							this.msj_persona = "Persona no existe.Por favor,llene los campos solicitados";
							this.GuardarOseleccionar = 'Guardar';
							this.persona = null;
							this.marcaPersona = 0;
							this.model.rut_beneficiario = '';
							this.model.apellido_paterno = '';
							this.model.apellido_materno = '';
							this.model.nombre_beneficiario = '';
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
	ObtenerDatosPoliza() {
		try {
			if (this.poliza) {
				this.polizaRequest.P_POLIZA = this.poliza;
				this.cuotaMortuariaService.ObtieneDatosPoliza(this.polizaRequest).subscribe((datos: PolizaResponse[]) => {
					if (datos === [] || datos.length === 0) {
					} else {
						this.polizaResponse = datos[0];
						this.ObtenerDatosCausante();
						this.ObtenerDatosEjecutivo();
						this.ObtieneListaGrupoPagoBeneficiarios();
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
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
	CheckPoder() {
		try {
			this.checkPoderRequest.P_POLIZA = this.poliza;
			this.checkPoderRequest.P_TIPOPODER = this.tipoPoderSelected.ID;
			//que va aqui
			//1 es ingresado
			this.checkPoderRequest.P_ID_RECEP = this.persona.NAT_ID;
			this.checkPoderRequest.P_CAUSANTE = this.selectedBeneficiarios[0].NAT_ID;
			this.ingresoPoderesService.CheckPoder(this.checkPoderRequest).subscribe((datos: CheckPoderResponse[]) => {
				if (datos === null || datos === undefined) {
					// console.log('no se pudo checkear poder');
				} else {
					this.checkPoderResponse = datos[0];
					if (this.checkPoderResponse.CONT > 0) {
						this.showWarnViaMessagesString(
							'ya tiene poder ingresado para el tipo ' + this.tipoPoderSelected.TEXTO + ', para el mismo beneficiario y receptor'
						);
						this.fechasInvalidas = true;
						this.permiteIngreso = false;
						return;
					} else {
						this.msgs = [];
						this.AgregaPoder();
					}
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}

	//limpiar pantalla si guarda exitoso y dejar mensaje se ingreso exitosamente y boton recepcion docto
	AgregaPoder() {
		try {
			if (
				(this.ObjectLength(this.model) === 11 && this.fechasInvalidas === false) ||
				(this.ObjectLength(this.model) === 10 && this.TipoSuscripcion === false && this.fechasInvalidas === false)
			) {
				this.fechasInvalidas = false;
				this.agregaPoderRequest.P_POLIZA = this.poliza;
				this.agregaPoderRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;
				this.agregaPoderRequest.P_RST = 1;
				this.agregaPoderRequest.P_LINEA = this.polizaResponse.POL_LINEA;
				this.agregaPoderRequest.P_ID_RECEP = this.persona.NAT_ID;
				this.agregaPoderRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
				this.agregaPoderRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
				this.agregaPoderRequest.P_FECHANOTIFICACION = this.model.fecha_notificacion;
				this.agregaPoderRequest.P_FECHASUSCRIPCION = this.model.fecha_suscripcion;
				this.agregaPoderRequest.P_FECHAVENCIMIENTO = this.model.fecha_vencimiento;
				//que va aqui
				this.agregaPoderRequest.P_ID_REPRE = this.selectedBeneficiarios[0].NAT_ID;
				this.agregaPoderRequest.P_TIPOPODER = this.tipoPoderSelected.ID;
				this.agregaPoderRequest.P_GRUPO = this.selectedBeneficiarios[0].GRP_GRUPO;

				this.ingresoPoderesService.AgregaPoder(this.agregaPoderRequest).subscribe((datos: AgregaPoderResponse) => {
					if (datos === null || datos === undefined) {
						// console.log('no se pudo agregar poder');
					} else {
						this.agregaPoderResponse = datos;

						if (this.agregaPoderResponse.P_RESULTADO === 1) {
							this.permiteIngreso = false;
							this.guardoCorrectamente = true;
							this.seleccionoBeneficiario = false;
							this.msgs = [];
						} else {
							this.guardoCorrectamente = false;
							this.seleccionoBeneficiario = true;
							this.fechasInvalidas = true;
							this.showWarnViaMessagesString('No se pudo guardar poder, porfavor intente nuevamente.');
							return;
						}
						// console.log(datos);
					}
				});
			} else {
				this.showWarnViaMessagesString('porfavor complete o valide, todos los campos del formulario');
				this.fechasInvalidas = true;
				return;
			}
		} catch (error) {
			// console.log(error);
		}
	}

	AnulaUltimoPoder() {
		try {
			this.anulaUltimoPoderRequest.P_POLIZA = this.poliza;
			this.anulaUltimoPoderRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			//que va aqui
			this.anulaUltimoPoderRequest.P_REPRESENTANTE = this.selectedBeneficiarios[0].NAT_ID;
			this.anulaUltimoPoderRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.anulaUltimoPoderRequest.P_GRUPO = this.selectedBeneficiarios[0].GRP_GRUPO;
			this.anulaUltimoPoderRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.anulaUltimoPoderRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;

			this.ingresoPoderesService.AnulaUltimoPoder(this.anulaUltimoPoderRequest).subscribe((datos: AnulaUltimoPoderResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no se pudo anular ultimo poder');
				} else {
					this.anulaUltimoPoderResponse = datos[0];
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	ObtieneTiposPoderes() {
		try {
			this.ingresoPoderesService.ObtieneTiposPoderes().subscribe((datos: ObtieneTiposPoderesResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no se obtuvo tipos poderes');
				} else {
					this.obtieneTiposPoderesResponse = datos;
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	ObtieneListaPoderes() {
		try {
			this.obtieneListaPoderesRequest.P_POLIZA = this.poliza;
			this.obtieneListaPoderesRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.obtieneListaPoderesRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.obtieneListaPoderesRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.obtieneListaPoderesRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			//que va aqui
			this.obtieneListaPoderesRequest.P_TIPO = 0;
			this.obtieneListaPoderesRequest.P_USER = 0;

			this.ingresoPoderesService.ObtieneListaPoderes(this.obtieneListaPoderesRequest).subscribe((datos: ObtieneListaPoderesResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no se obtuvo lista poderes');
				} else {
					this.obtieneListaPoderesResponse = datos;
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	BorraPoderes() {
		try {
			//que va aqui
			this.borraPoderesRequest.P_TIPO = 0;
			this.borraPoderesRequest.P_CORRELATIVO = 0;
			this.borraPoderesRequest.P_USER = 0;

			this.ingresoPoderesService.BorraPoderes(this.borraPoderesRequest).subscribe((datos: BorraPoderesResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no se pudo borrar poder');
				} else {
					this.borraPoderesResponse = datos[0];
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	AutorizaPoderMfp() {
		try {
			this.autorizaPoderesMfp.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.autorizaPoderesMfp.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.autorizaPoderesMfp.P_LINEA = this.polizaResponse.POL_LINEA;
			this.autorizaPoderesMfp.P_POLIZA = this.poliza;
			this.autorizaPoderesMfp.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			this.ingresoPoderesService.AutorizaPoderMfp(this.autorizaPoderesMfp).subscribe((datos: AutorizaPoderMfpResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no se pudo autorizar poder mfp');
				} else {
					this.autorizaPoderesMfpResponse = datos[0];
					// console.log(datos);
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	IngresaPoderMfp() {
		try {
			this.ingresaPoderMfpRequest.P_CAUSANTE = this.datosCausanteResponse.NAT_ID;
			this.ingresaPoderMfpRequest.P_DOCUMENTO = this.polizaResponse.POL_DOCUMENTO;
			this.ingresaPoderMfpRequest.P_LINEA = this.polizaResponse.POL_LINEA;
			this.ingresaPoderMfpRequest.P_POLIZA = this.poliza;
			this.ingresaPoderMfpRequest.P_PRODUCTO = this.polizaResponse.POL_PRODUCTO;

			//que va aqui
			this.ingresaPoderMfpRequest.P_PERIODO = 0;
			this.ingresaPoderMfpRequest.P_COBERTURA = 0;
			this.ingresaPoderMfpRequest.P_BANCO = '0';
			this.ingresaPoderMfpRequest.P_MES = 0;
			this.ingresaPoderMfpRequest.P_CTA_BCO = 0;

			this.ingresoPoderesService.IngresaPoderMfp(this.ingresaPoderMfpRequest).subscribe((datos: IngresaPoderMfpResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no se pudo ingresar poder mfp');
				} else {
					this.ingresaPoderMfpResponse = datos[0];
					// console.log(datos);
				}
			});
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
							// console.log(datos);
						}
					});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}
	AbrirRecepcionDeDocumentos() {
		try {
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
							this.esconderRecepcionExitoso = false;
						} else {
							this.showWarnViaMessages(3);
							this.generoRemesable = false;
							this.esconderRecepcionExitoso = true;
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

	//validar sobreviviencia 1 y si se selecciona causante para no permitir ingresar poder
}
