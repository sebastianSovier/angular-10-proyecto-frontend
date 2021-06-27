import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaGrupoPagoPolizaRequest, ObtieneListaGrupoPagoBeneficiariosRequest } from '../models/garantiaEstatal/lista-grupo-pago-poliza.model';

import { GrupoPagoModel } from '../models/garantiaEstatal/grupo-pago-model.model';
import { ObtieneDatosControlDocto } from '../models/garantiaEstatal/obtiene-datos-control-docto.model';
import { ValidaSolicitudGarantiaEstatal } from '../models/garantiaEstatal/valida-solicitud-garantia-estatal.model';
import { ValidaExisteSolicitudGe } from '../models/garantiaEstatal/valida-existe-solicitud-ge.model';
import { ValidaCheckSolicitudGe } from '../models/garantiaEstatal/valida-solicitud-ge.model';
import { ObtieneEstadoGe } from '../models/garantiaEstatal/obtiene-estado-ge.model';
import { ExisteBenAps } from '../models/garantiaEstatal/existe-ben-aps.model';
import { DatosSolicitudGe } from '../models/garantiaEstatal/datos-solicitud-ge.model';
import { IngresaActualizaSolicitudGe } from '../models/garantiaEstatal/ingresa-actualiza-solicitud-ge.model';
import { ValidaSiContinuaSegundaTabla } from '../models/garantiaEstatal/valida-si-continua-segunda-tabla.model';

import { AppConfig } from './appconfig';
import { ListaBeneficiariosModel } from '../models/garantiaEstatal/lista-beneficiarios-model.model';
import { PersonaCausanteRequest } from '../models/cuotaMortuaria/persona.model';

@Injectable({
  providedIn: 'root'
})
export class GarantiaEstatalService {

  constructor(private http: HttpClient) { }


  ObtieneListaBeneficiarios(ObtieneListaBeneficiarios: ListaBeneficiariosModel) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneListaBeneficiarios', ObtieneListaBeneficiarios);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaGrupoPagoPoliza(ObtieneListaGrupoPagoPoliza: ListaGrupoPagoPolizaRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneListaGrupoPagoPoliza', ObtieneListaGrupoPagoPoliza);
      return result;

    } catch (error) {

    }
  }
  ObtieneGrupoPagoBeneficiario(ObtieneDatosGrupoPago: GrupoPagoModel) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneBeneficiarioGrupoPago', ObtieneDatosGrupoPago);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosControlDocto(obtieneDatosControlDoctoRequest: ObtieneDatosControlDocto) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneDatosControlDocto', obtieneDatosControlDoctoRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosCausante(ObtieneDatosCausante: PersonaCausanteRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneCausante', ObtieneDatosCausante);
      return result;

    } catch (error) {

    }
  }
  ValidaSolicitudGe(ValidaSolicitudGeRequest: ValidaSolicitudGarantiaEstatal) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ValidaSolicitudGE', ValidaSolicitudGeRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaGrupoPagoBeneficiarios(ObtieneListaGrupoPagoBeneficiariosRequest: ObtieneListaGrupoPagoBeneficiariosRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneListaGrupoPagoBeneficiarios', ObtieneListaGrupoPagoBeneficiariosRequest);
      return result;

    } catch (error) {

    }
  }
  ValidaExisteSolicitudGE(ValidaExisteSolicitudGeRequest: ValidaExisteSolicitudGe) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ValidaExisteSolicitudGE', ValidaExisteSolicitudGeRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneEstadoGe(ObtieneEstadoGeRequest: ObtieneEstadoGe) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneEstadoGe', ObtieneEstadoGeRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneCheckEstadoGe(ValidaCheckSolicitudGeRequest: ValidaCheckSolicitudGe) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneCheckEstadoGe', ValidaCheckSolicitudGeRequest);
      return result;

    } catch (error) {

    }
  }
  ExisteBenAps(ExisteBenApsRequest: ExisteBenAps) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ExisteBenAps', ExisteBenApsRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosSolicitudGe(DatosSolicitudGeRequest: DatosSolicitudGe) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ObtieneDatosSolicitudGe', DatosSolicitudGeRequest);
      return result;

    } catch (error) {

    }
  }
  IngresaActualizaSolicitudGe(IngresaActualizaSolicitudGeRequest: IngresaActualizaSolicitudGe) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/IngresaActualizaSolicitugGe', IngresaActualizaSolicitudGeRequest);
      return result;

    } catch (error) {

    }
  }
  ValidaSiContinuaSegundaTabla(ValidaSiContinuaRequest: ValidaSiContinuaSegundaTabla) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/GarantiaEstatal/ValidaSiContinuaSegundaTabla', ValidaSiContinuaRequest);
      return result;

    } catch (error) {

    }
  }
}
