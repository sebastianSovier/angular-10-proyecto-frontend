import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlDocto, ControlDoctoResponse } from 'src/app/models/cuotaMortuaria/control-docto.model';
import { AppConfig } from 'src/app/services/appconfig';
import { CuotaMortuariaService } from 'src/app/services/cuota-mortuaria.service';
import { DatosEjecutivo, DatosEjecutivoResponse } from 'src/app/models/cuotaMortuaria/datos-ejecutivo.model';
import { FormatRutPipe } from 'src/app/utilities/format-rut.pipe';
import { PolizaResponse } from 'src/app/models/cuotaMortuaria/poliza.model';
import { ObtieneDatosBeneficiarioRequest, ObtieneDatosBeneficiarioResponse } from 'src/app/models/cuotaMortuaria/modifica-atributo-siete.model';
import { PersonaCausanteRequest, PersonaCausanteResponse } from 'src/app/models/cuotaMortuaria/persona.model';
import { ObtieneCuotaMortuaria, ObtieneCuotaMortuariaRequest } from 'src/app/models/cuotaMortuaria/obtiene-cuota-mortuaria.model';
import { Subscription } from 'rxjs';
import { MessageUtilidad } from 'src/app/models/message-utilidad';

@Component({
	selector: 'app-pago-cuota-mortuaria',
	templateUrl: './pago-cuota-mortuaria.component.html',
	styleUrls: ['./pago-cuota-mortuaria.component.scss'],
})
export class PagoCuotaMortuariaComponent implements OnInit {
	msgs: MessageUtilidad[] = [];
	datosIngresoSolicitud: any = [];
	respuestaControlDocto = true;
	p_cuota = 'Cuota Ingresada con Éxito.';
	recepcionarDocto = false;
	fecha_solicitud = '';
	poliza = 0;
	compania = '';
	rut = '';
	nombre = '';
	relacion = '';
	fecha_defuncion = '';
	sucursal = '';
	nombre_del_receptor = '';
	rut_receptor = '';
	rut_empresa = '';
	razon_social = '';
	sucursal_empresa = '';
	numero_factura = '';
	fecha_factura = '';
	monto_aprobado = '';
	monto_cobrado = '';
	nombre_ejecutivo = '';
	resultado: number = 0;
	codigo_barra = '';
	mostrarIframeRespuesta = false;
	urlSafeAperturaControlDocto: any;
	displayComprobante = false;
	parametrosApertura: string = '';
	urlSafeRespuestaControlDocto: any;

	mostrarIframe = false;
	datosRespuestaRecepcionDoctos: number = 0;
	abrirRecepcion: number = 0;
	controlDoctoRequest: ControlDocto = new ControlDocto();
	controlDoctoResponse: ControlDoctoResponse = new ControlDoctoResponse();
	datosIngresoEntrada: any = {};
	datosEjecutivoRequest: DatosEjecutivo = new DatosEjecutivo();
	datosEjecutivoResponse: DatosEjecutivoResponse = new DatosEjecutivoResponse();
	datosPoliza: PolizaResponse = new PolizaResponse();
	datosBeneficiarioRequest: ObtieneDatosBeneficiarioRequest = new ObtieneDatosBeneficiarioRequest();
	datosBeneficiarioResponse: ObtieneDatosBeneficiarioResponse = new ObtieneDatosBeneficiarioResponse();
	datosCausanteRequest: PersonaCausanteRequest = new PersonaCausanteRequest();
	datosCausanteResponse: PersonaCausanteResponse = new PersonaCausanteResponse();
	obtieneCuotaMorturiaRequest: ObtieneCuotaMortuariaRequest = new ObtieneCuotaMortuariaRequest();
	obtieneCuotaMorturiaResponse: ObtieneCuotaMortuaria = new ObtieneCuotaMortuaria();
	Subscription: Subscription;
	esImpresion = false;
	cierreModalRecepcionDocto = false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private sanitizer: DomSanitizer,
		private cuotaMortuariaService: CuotaMortuariaService,
		private route: Router,
		private rutproperties: FormatRutPipe
	) {
		try {
		} catch (error) {}
	}
	ngOnInit(): void {
		try {
			this.activatedRoute.queryParams.subscribe((params) => {
				this.resultado = params.respuesta;
			});
			//1 ingreso 2 modificar
			if (this.resultado.toString() === sessionStorage.getItem('ingresoExitoso').toString()) {
				// console.log(this.resultado);
				this.datosIngresoEntrada = JSON.parse(sessionStorage.getItem('parametrosEntradaCuotaM'));
				this.datosIngresoSolicitud = JSON.parse(sessionStorage.getItem('objetoSolicitud'));
				this.datosPoliza = JSON.parse(sessionStorage.getItem('datosPoliza'));
				this.recepcionarDocto = true;
				this.ObtenerDatosControlDocto();
				this.ObtenerDatosBeneficiario();
				this.ObtenerDatosEjecutivo();
				this.ObtieneCuotaMortuaria();
				//this.completarDatosComprobante();
			} else {
				this.route.navigate(['']);
				sessionStorage.clear();
				//  this.route.ngOnDestroy();
			}
		} catch (error) {}
	}
	ObtenerDatosControlDocto() {
		try {
			if (this.datosPoliza.POL_POLIZA) {
				this.controlDoctoRequest.P_POLIZA = this.datosPoliza.POL_POLIZA;
				this.cuotaMortuariaService.ObtieneDatosControlDocto(this.controlDoctoRequest).subscribe((datos: ControlDoctoResponse[]) => {
					if (datos === [] || datos.length === 0) {
						// console.log('no existe registro personas');
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
	ObtenerDatosCausante() {
		try {
			this.datosCausanteRequest.P_PERSONA_RUT = this.datosPoliza.NUM_RUT_NAT;
			this.datosCausanteRequest.P_POLIZA = this.datosPoliza.POL_POLIZA;
			this.cuotaMortuariaService.ObtieneDatosCausante(this.datosCausanteRequest).subscribe((datos: PersonaCausanteResponse[]) => {
				if (datos === [] || datos.length === 0) {
					// console.log('no existe registro personas');
				} else {
					this.datosCausanteResponse = datos[0];
					// console.log(datos);
					this.completarDatosComprobante();
				}
			});
		} catch (error) {
			// console.log(error);
		}
	}
	ObtieneCuotaMortuaria() {
		try {
			if (this.poliza) {
				this.obtieneCuotaMorturiaRequest.P_CUO_LIN = this.datosPoliza.POL_LINEA; //3
				this.obtieneCuotaMorturiaRequest.P_CUO_PRD = this.datosPoliza.POL_PRODUCTO;
				this.obtieneCuotaMorturiaRequest.P_CUO_DOC = this.datosPoliza.POL_DOCUMENTO; //2
				this.obtieneCuotaMorturiaRequest.P_CUO_POL = this.datosPoliza.POL_POLIZA; //viene en la url inicial

				this.cuotaMortuariaService.ObtieneCuotaMortuaria(this.obtieneCuotaMorturiaRequest).subscribe((datos: ObtieneCuotaMortuaria[]) => {
					if (datos === [] || datos.length === 0) {
						// console.log('no existe registro personas');
					} else {
						this.obtieneCuotaMorturiaResponse = datos[0];
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}
	completarDatosComprobante() {
		try {
			this.fecha_solicitud = this.obtieneCuotaMorturiaResponse.FECHA_SOLICITUD_DDMMYYYY;
			this.poliza = this.datosPoliza.POL_POLIZA;
			this.compania = 'Compañia de Seguros CONFUTURO S.A.';
			this.rut = this.datosCausanteResponse.NAT_NUMRUT.toString() + '-' + this.datosCausanteResponse.NAT_DV;
			this.nombre =
				this.datosCausanteResponse.NAT_NOMBRE + ' ' + this.datosCausanteResponse.NAT_AP_PAT + ' ' + this.datosCausanteResponse.NAT_AP_MAT;
			this.relacion = 'Causante';
			this.fecha_defuncion = this.datosCausanteResponse.NAT_FEC_MUERTE;
			this.sucursal = this.datosIngresoSolicitud.textoSucursal;
			this.nombre_del_receptor = this.datosIngresoSolicitud.nombre_receptor;
			this.rut_receptor =
				this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.datosIngresoSolicitud.rut_receptor)) +
				'-' +
				this.datosIngresoSolicitud.rut_dv_receptor;
			this.rut_empresa =
				this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.datosIngresoSolicitud.rut_empresa)) +
				'-' +
				this.datosIngresoSolicitud.rut_dv_empresa;
			this.razon_social = this.datosIngresoSolicitud.razon_social;
			this.sucursal_empresa = this.datosIngresoSolicitud.sucursal_empresa;
			this.numero_factura = this.datosIngresoSolicitud.numero_factura;
			this.fecha_factura = this.obtieneCuotaMorturiaResponse.FECHA_FACTURA_DDMMYYYY;
			this.monto_aprobado = this.datosIngresoSolicitud.monto_aprobado;
			this.monto_cobrado = this.datosIngresoSolicitud.monto_cobrado;
			this.nombre_ejecutivo = this.datosEjecutivoResponse.NOMBRES + ' ' + this.datosEjecutivoResponse.APELLIDOPATERNO;

			//El resto de los dígitos son: identificación de número de póliza, RUT causante y RUT beneficiario (datos variables).
			this.codigo_barra = '210172' + this.poliza.toString() + this.rut + this.rut_receptor;
		} catch (error) {}
	}

	ObtenerDatosEjecutivo() {
		try {
			if (this.datosIngresoEntrada) {
				this.datosEjecutivoRequest.IDEJECUTIVO = this.datosIngresoEntrada.IDEJECUTIVO;
				this.cuotaMortuariaService.ObtieneDatosEjecutivo(this.datosEjecutivoRequest).subscribe((datos: DatosEjecutivoResponse[]) => {
					if (datos === [] || datos.length === 0) {
						// console.log('no existe registro personas');
					} else {
						this.datosEjecutivoResponse = datos[0];
						this.ObtenerDatosCausante();
						//this.completarDatosComprobante();
						// console.log(datos);
					}
				});
			} else {
			}
		} catch (error) {
			// console.log(error);
		}
	}
	closeModal() {
		this.cierreModalRecepcionDocto = true;
	}
	AbrirRecepcionDeDocumentos() {
		try {
			this.cierreModalRecepcionDocto = false;
			//"&clte=" y "&crut=" entregar rut causante sin digito
			this.parametrosApertura =
				'?lneg=' +
				this.datosIngresoEntrada.cia + //lo que ingresa por url de ingreso cuota mortuaria CF
				'&lpro=4' +
				'&plan=1' +
				'&prod=1' +
				'&proc=' +
				this.controlDoctoResponse.CRPROCESO +
				'&cact=' +
				this.controlDoctoResponse.IDACTIVIDAD +
				'&idop=' +
				this.datosIngresoEntrada.poliza +
				'&clte=' +
				this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.datosCausanteRequest.P_PERSONA_RUT.toString())) +
				'&ncon=' +
				this.datosIngresoEntrada.poliza +
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
				'&host=192.168.0.0' + //
				'&ccar=' +
				this.datosBeneficiarioResponse.BNF_GRUPO + //lista grupos familiares
				'&crut=' +
				this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.datosCausanteRequest.P_PERSONA_RUT.toString())) + //lista rut grupo familiar  rut beneficiario
				'&cpar=' +
				this.datosBeneficiarioResponse.BEN_RELACION + //lista cod relacion grupo familiar
				'&cnom=' +
				this.datosIngresoSolicitud.nombre_receptor + //lista NOMBRES grupo familiar   nombre beneficiario
				'&ntransaccion=' +
				this.datosIngresoEntrada.transaccion;

			this.urlSafeAperturaControlDocto = this.sanitizer.bypassSecurityTrustResourceUrl(
				AppConfig.settings.UrlAbrirControlDocumentos + this.parametrosApertura
			);
			this.mostrarIframe = true;
			this.abrirRecepcion = 1;
			this.RespuestaRecepcionDoctos();
			// console.log(this.urlSafeAperturaControlDocto);
		} catch (error) {}
	}
	RespuestaRecepcionDoctos() {
		try {
			setTimeout(() => {
				const parametrosRespuesta =
					'?p_transac=' +
					this.datosIngresoEntrada.transaccion +
					'&cia=' +
					this.datosIngresoEntrada.cia +
					'&p_proceso=' +
					this.controlDoctoResponse.IDPROCESO +
					'&p_poliza=' +
					this.datosIngresoEntrada.poliza +
					'&p_rutcliente=' +
					this.rutproperties.rutSinDigito(this.rutproperties.rutClean(this.datosCausanteRequest.P_PERSONA_RUT.toString()));

				this.Subscription = this.cuotaMortuariaService.ObtieneRespuestaRecepcionDoctos(parametrosRespuesta).subscribe((datos) => {
					if (this.cierreModalRecepcionDocto === true) {
						if (datos > 0) {
							// console.log('respuesta recepcion ' + datos);
							this.datosRespuestaRecepcionDoctos = datos;
							this.showWarnViaMessages(1);
							this.respuestaControlDocto = false;
							this.recepcionarDocto = false;
							this.Subscription.unsubscribe();
						} else {
							this.showWarnViaMessages(3);
							// this.RespuestaRecepcionDoctos();
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
	ObtenerDatosBeneficiario() {
		try {
			if (this.datosPoliza) {
				this.datosBeneficiarioRequest.P_CUO_DOC = this.datosPoliza.POL_DOCUMENTO;
				this.datosBeneficiarioRequest.P_CUO_LIN = this.datosPoliza.POL_LINEA;
				this.datosBeneficiarioRequest.P_CUO_PRD = this.datosPoliza.POL_PRODUCTO;
				this.datosBeneficiarioRequest.P_CUO_POL = this.datosPoliza.POL_POLIZA;
				this.datosBeneficiarioRequest.P_BEN = this.datosCausanteRequest.P_PERSONA_RUT;

				this.cuotaMortuariaService
					.ObtieneDatosBeneficiario(this.datosBeneficiarioRequest)
					.subscribe((datos: ObtieneDatosBeneficiarioResponse[]) => {
						if (datos === [] || datos.length === 0) {
							// console.log('no existe registro de beneficiarios');
						} else {
							this.datosBeneficiarioResponse = datos[0];

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
			this.esImpresion = true;
			const printContent = document.getElementById('formImprimir');
			const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
			WindowPrt.document.write(printContent.innerHTML);
			WindowPrt.document.write('<link rel="stylesheet" href="/assets/theme/theme-bluegrey.css">');
			WindowPrt.document.write('<link rel="stylesheet" href="/assets/flex.css">');
			WindowPrt.document.close();
			WindowPrt.focus();
			WindowPrt.print();
			this.esImpresion = false;
		} catch (error) {}
	}
	showWarnViaMessages(opcion: number = 2) {
		if (opcion === 1) {
			this.msgs = [];
			this.msgs.push({
				severity: 'success',
				summary: '',
				detail:
					'Documentos Ingresados Correctamente , Remesable: ' +
					this.datosRespuestaRecepcionDoctos +
					'  Número de transacción Asociada: ' +
					this.datosIngresoEntrada.transaccion +
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
}
