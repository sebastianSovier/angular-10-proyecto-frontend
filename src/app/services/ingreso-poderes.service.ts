import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './appconfig';
import { ObtieneListaPoderes } from '../models/ingresoPoderes/obtiene-lista-poderes.model';
import { AgregaPoder } from '../models/ingresoPoderes/agrega-poder.model';
import { IngresaPoderMfp } from '../models/ingresoPoderes/ingresa-poder-mfp.model';
import { AutorizaPoderMfp } from '../models/ingresoPoderes/autoriza-poder-mfp.model';
import { CheckPoder } from '../models/ingresoPoderes/check-poder.model';
import { AnulaUltimoPoder } from '../models/ingresoPoderes/anula-ultimo-poder.model';
import { BorraPoderes } from '../models/ingresoPoderes/borra-poderes.model';
import { ObtieneDatosControlDocto } from '../models/ingresoPoderes/obtiene-datos-control-docto.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoPoderesService {

  constructor(private http: HttpClient) { }


  ObtieneTiposPoderes() {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/ObtieneTiposPoderes', null);
      return result;

    } catch (error) {

    }
  }
  ObtieneListaPoderes(ObtieneListaPoderesRequest:ObtieneListaPoderes) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/ObtieneListaPoderes', ObtieneListaPoderesRequest);
      return result;

    } catch (error) {

    }
  }
  AgregaPoder(AgregaPoderRequest: AgregaPoder) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/AgregaPoder', AgregaPoderRequest);
      return result;

    } catch (error) {

    }
  }
  IngresaPoderMfp(IngresaPoderMfpRequest: IngresaPoderMfp) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/IngresaPoderMfp', IngresaPoderMfpRequest);
      return result;

    } catch (error) {

    }
  }
  AutorizaPoderMfp(AutorizaPoderMfpRequest: AutorizaPoderMfp) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/AutorizaPoderMfp', AutorizaPoderMfpRequest);
      return result;

    } catch (error) {

    }
  }
  CheckPoder(CheckPoderRequest: CheckPoder) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/CheckPoder', CheckPoderRequest);
      return result;

    } catch (error) {

    }
  }
  AnulaUltimoPoder(AnulaUltimoPoderRequest: AnulaUltimoPoder) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/AnulaUltimoPoder', AnulaUltimoPoderRequest);
      return result;

    } catch (error) {

    }
  }
  BorraPoderes(BorraPoderesRequest: BorraPoderes) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/BorraPoderes', BorraPoderesRequest);
      return result;

    } catch (error) {

    }
  }
  ObtieneDatosControlDocto(ObtieneDatosControlDocto: ObtieneDatosControlDocto) {
    try {
      const result: Observable<any> = this.http.post(AppConfig.settings.UrlWebApi + '/IngresoPoderes/ObtieneDatosControlDocto', ObtieneDatosControlDocto);
      return result;

    } catch (error) {

    }
  }
}
