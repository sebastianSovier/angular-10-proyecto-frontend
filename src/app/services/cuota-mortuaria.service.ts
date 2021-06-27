import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngresaCuotaMortuariaModel } from '../models/cuotaMortuaria/ingresa-cuota-mortuaria-model.model';
import { PersonaCausanteRequest, PersonaGuardarRequest, PersonaRequest } from '../models/cuotaMortuaria/persona.model';
import { CertificadoDefuncionRequest } from '../models/cuotaMortuaria/certificado-defuncion.model';
import { ObtieneCuotaMortuariaRequest } from '../models/cuotaMortuaria/obtiene-cuota-mortuaria.model';
import { ControlDocto } from '../models/cuotaMortuaria/control-docto.model';
import { AppConfig } from './appconfig';
import { Poliza } from '../models/cuotaMortuaria/poliza.model';
import { ModificaAtributoSieteRequest, ObtieneDatosBeneficiarioRequest } from '../models/cuotaMortuaria/modifica-atributo-siete.model';
import { UfRequest } from '../models/cuotaMortuaria/sucursales.model';
import { DatosEjecutivo } from '../models/cuotaMortuaria/datos-ejecutivo.model';


@Injectable({
  providedIn: 'root'
})
export class CuotaMortuariaService {

  constructor(private http: HttpClient) { }

  IngresaCuotaMortuaria(ingresaCuotaMortuariaModel: IngresaCuotaMortuariaModel) {
    try {

      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/GuardarSolicitud', ingresaCuotaMortuariaModel);
      return result;

    } catch (error) {
    }
  }
  IngresaNuevaCuotaMortuaria(ingresaNuevaCuotaMortuariaModel: IngresaCuotaMortuariaModel) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/InsertaCuotaMortuaria', ingresaNuevaCuotaMortuariaModel);
      return result;

    } catch (error) {

    }
  }
  ModificarSolicitud(modificaCuotaMortuaria: IngresaCuotaMortuariaModel) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ModificarSolicitud', modificaCuotaMortuaria);
      return result;

    } catch (error) {

    }
  }
  ObtieneSucursales() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneSucursales', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosEjecutivo(datosEjecutivoRequest:DatosEjecutivo) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneDatosEjecutivo', datosEjecutivoRequest);
      return result;

    } catch (error) {

    }
  }
  ObtienePersona(personaRequest: PersonaRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtienePersona', personaRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneUf(ufRequest: UfRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneUf', ufRequest);
      return result;

    } catch (error) {

    }
  }
  GuardarPersona(personaGuardarRequest: PersonaGuardarRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/GuardarPersona', personaGuardarRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneCertificadoDefuncion(certificadoDefuncionRequest: CertificadoDefuncionRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneCertificadoDefuncion', certificadoDefuncionRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosControlDocto(controlDoctoRequest: ControlDocto) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneDatosControlDocto', controlDoctoRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosPoliza(poliza: Poliza) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneDatosPoliza', poliza);
      return result;

    } catch (error) {

    }
  }
  ObtieneCuotaMortuaria(obtieneCuotaMortuaria: ObtieneCuotaMortuariaRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneCuotaMortuaria', obtieneCuotaMortuaria);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosBeneficiario(obtieneDatosBeneficiario: ObtieneDatosBeneficiarioRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneDatosBeneficiario', obtieneDatosBeneficiario);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosCausante(ObtieneDatosCausante: PersonaCausanteRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ObtieneCausante', ObtieneDatosCausante);
      return result;

    } catch (error) {

    }
  }
  ActualizarAtributoSiete(modificaAtributoSiete: ModificaAtributoSieteRequest) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/CuotaMortuaria/ActualizarAtributoSiete', modificaAtributoSiete);
      return result;

    } catch (error) {

    }
  }
  ObtieneRespuestaRecepcionDoctos(parametros: string) {
    try {
      const result: Observable<any> = this.http.get(AppConfig.settings.UrlRespuestaControlDocumentos + parametros);
      console.log(result);
      return result;
    } catch (error) {

    }
  }
  
  AperturaRecepcionDoctos(parametros: string) {
    try {
      console.log(AppConfig.settings.UrlRespuestaControlDocumentos + parametros);
      const result: Observable<any> = this.http.get(AppConfig.settings.UrlRespuestaControlDocumentos + parametros); 
      return result;
    } catch (error) {

    }
  }
}
