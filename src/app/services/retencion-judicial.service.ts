import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './appconfig';
import { ActualizaCargaRj } from '../models/retencionJudicial/actualiza-carga-rj.model';
import { AgregaRj } from '../models/retencionJudicial/agrega-rj.model';
import { BorraRetencionJudicial } from '../models/retencionJudicial/borra-retencion-judicial.model';
import { CheckRetJud } from '../models/retencionJudicial/check-ret-jud.model';
import { ObtieneListaRjParaEliminar } from '../models/retencionJudicial/obtiene-lista-rj-para-eliminar.model';
import { ObtieneListaRj } from '../models/retencionJudicial/obtiene-lista-rj.model';
import { ObtieneRetencionesJud } from '../models/retencionJudicial/obtiene-retenciones-jud.model';
import { ObtienePensionSobre } from '../models/retencionJudicial/obtiene-pension-sobre.model';
import { ObtienePensionVejInv } from '../models/retencionJudicial/obtiene-pension-vej-inv.model';
import { CheckRetJudicial } from '../models/retencionJudicial/check-ret-judicial.model';
import { CheckTieneGarantiaEstatal } from '../models/retencionJudicial/check-tiene-garantia-estatal.model';
import { ObtieneBonoMontoMinimoPension } from '../models/retencionJudicial/obtiene-bono-monto-minimo-pension.model';
import { ObtieneMontoMinimoPension } from '../models/retencionJudicial/obtiene-monto-minimo-pension.model';
import { ObtenerEstadoGe } from '../models/retencionJudicial/obtener-estado-ge.model';

@Injectable({
  providedIn: 'root'
})
export class RetencionJudicialService {

  constructor(private http: HttpClient) { }


  ActualizaCargaRj(ActualizaCargaRjRequest: ActualizaCargaRj) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ActualizaCargaRj', ActualizaCargaRjRequest);
      return result;

    } catch (error) {

    }
  }
  AgregarRj(AgregaRjRequest: AgregaRj) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/AgregarRj', AgregaRjRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneSecuenciaRj() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneSecuenciaRj', null);
      return result;

    } catch (error) {

    }
  }
  CheckRetJud(CheckRetJudRequest: CheckRetJud) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/CheckRetJud', CheckRetJudRequest);
      return result;

    } catch (error) {

    }
  }
  BorraRetencionJudicial(BorraRetencionJudicialRequest: BorraRetencionJudicial) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/BorraRetencionJudicial', BorraRetencionJudicialRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaRj(ObtieneListaRjRequest: ObtieneListaRj) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneListaRj', ObtieneListaRjRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaRjParaEliminar(ObtieneListaRjParaEliminarRequest: ObtieneListaRjParaEliminar) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneListaRjParaEliminar', ObtieneListaRjParaEliminarRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneRetencionesJudiciales(ObtieneRetencionesJudicialesRequest: ObtieneRetencionesJud) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneRetencionesJudiciales', ObtieneRetencionesJudicialesRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneMontoPensionVejInv(ObtieneMontoPensionVejInvRequest: ObtienePensionVejInv) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneMontoPensionVejInv', ObtieneMontoPensionVejInvRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneMontoPensionSobre(ObtieneMontoPensionSobreRequest: ObtienePensionSobre) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneMontoPensionSobre', ObtieneMontoPensionSobreRequest);
      return result;

    } catch (error) {

    }
  }
  ObtienePeriodoActual() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtienePeriodoActual', null);
      return result;

    } catch (error) {

    }
  }
  CheckRetJudicial(CheckRetJudicialRequest: CheckRetJudicial) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/CheckRetJudicial', CheckRetJudicialRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaFormaDescuento() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneListaFormaDescuento', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaFormaPago() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneListaFormaPago', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaAsigFamiliar() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneListaAsigFamiliar', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaBancos() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneListaBancos', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneValidacionFecha() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneValidacionFecha', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosControlDocto() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneDatosControlDocto', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneBonoMontoMinimo(ObtieneBonoMontoMinimoRequest:ObtieneBonoMontoMinimoPension) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneBonoMontoMinimo', ObtieneBonoMontoMinimoRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneEstadoGe(ObtieneEstadoGeRequest:ObtenerEstadoGe) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneEstadoGe', ObtieneEstadoGeRequest);
      return result;

    } catch (error) {

    }
  }
  CheckTieneGarantiaEstatal(CheckTieneGarantiaEstatalRequest:CheckTieneGarantiaEstatal) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/CheckTieneGarantiaEstatal', CheckTieneGarantiaEstatalRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneMontoMinimo(ObtieneMontoMinimoRequest:ObtieneBonoMontoMinimoPension) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/RetencionJudicial/ObtieneMontoMinimo', ObtieneMontoMinimoRequest);
      return result;

    } catch (error) {

    }
  }
}
