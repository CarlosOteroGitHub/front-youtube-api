import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userToken: string | undefined;
  private url_base: string = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private api_key: string = 'AIzaSyA5x9jnuRbug9fwX2v5p-pGdwajMPuCCl4';

  constructor(private httpClient: HttpClient) {
    this.leerToken();
  }

  get params(): HttpParams {
    return new HttpParams()
      .set('key', this.api_key);
  }

  login(usuarioModel: UsuarioModel) {
    const dataLogin: any = {
      email: usuarioModel.email,
      password: usuarioModel.password,
      volverSecureToken: true
    };

    return this.httpClient.post<UsuarioModel>(`${this.url_base}:signInWithPassword`, dataLogin, { params: this.params })
      .pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          return resp;
        })
      )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiracionToken');
  }

  registroNuevoUsuario(usuarioModel: UsuarioModel): Observable<UsuarioModel> {
    const dataRegistro: any = {
      ...usuarioModel,
      volverSecureToken: true
    };

    return this.httpClient.post<UsuarioModel>(`${this.url_base}:signUp`, dataRegistro, { params: this.params })
      .pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          return resp;
        })
      )
  }

  private guardarToken(idToken: string): void {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let fecha_hoy = new Date();
    fecha_hoy.setSeconds(3600);
    localStorage.setItem('expiracionToken', fecha_hoy.getTime().toString());
  }

  leerToken(): string {
    return this.userToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  validaAutenticacion(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expiracionToken'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}