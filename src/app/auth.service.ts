import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/LoginResponse';
import { Interface } from './models/Interfaces';
import {
  AGENCES,
  ALLINTERFACES,
  CLIENTS,
  CLIENTS_TYPE,
  INTERFACES,
  LOGIN,
  REGISTER,
  USERS,
  USER_AGENCES,
  VOITURES,
  VOITURESByUser,
} from './models/Apis';
import { Client } from './models/Client';
import { Agence } from './models/Agence';
import { Voiture } from './models/VoitreModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}
  loadAllVoitures(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(VOITURES, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  loadVoituresByUser(): Observable<any[]> {
    return this.http.get<any[]>(VOITURESByUser);
  }

 

  login(request: Request): Observable<LoginResponse> {
    console.log('====================================');
    console.log(request);
    console.log('====================================');
    return this.http.post<LoginResponse>(LOGIN, request, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'json',
    });
  }
  register(user: Client): Observable<Client> {
    return this.http.post<Client>(REGISTER, user);
  }
  loadInterfaces(userId: any): Observable<Interface[]> {
    return this.http.get<Interface[]>(INTERFACES.replace('{id}', userId + ''), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  loadAllInterfaces(): Observable<Interface[]> {
    return this.http.get<Interface[]>(ALLINTERFACES, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  loadClient(ownerid: any): Observable<Client[]> {
    return this.http.get<Client[]>(
      (CLIENTS_TYPE + '?type={type}').replace('{type}', 'CLIENT'),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: '' + sessionStorage.getItem('token'),
        }),
        responseType: 'json',
      }
    );
  }
  deleteClient(clientId: any): Observable<Client> {
    return this.http.delete<Client>(USERS + `/${clientId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  addClient(form: any): Observable<Client> {
    return this.http.post<Client>(USERS, form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  editClient(form: any): Observable<Client> {
    return this.http.post<Client>(USERS, form, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  addAgence(agence: any): Observable<Agence> {
    return this.http.post<Agence>(AGENCES, agence, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  loadAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>(
      USER_AGENCES.replace(
        '{id}',
        '' + Number(sessionStorage.getItem('userid'))
      ),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: '' + sessionStorage.getItem('token'),
        }),
        responseType: 'json',
      }
    );
  }
  deleteAgence(ag: any): Observable<Agence> {
    return this.http.delete<Agence>(AGENCES + `/${ag.id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  addVoitures(v: any): Observable<Voiture> {
    return this.http.post<Voiture>(VOITURES, v, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  editeAgence(v: any): Observable<Agence> {
    return this.http.put<Agence>(AGENCES, v, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  loadVoitures(ida: any): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(VOITURES + `/${ida}/agence`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  deleteVoiture(idv: any): Observable<Voiture> {
    return this.http.delete<Voiture>(VOITURES + `/${idv}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
  uploadImg(formdata: FormData): Observable<any> {
    console.log('ubpload service : ', formdata.get('id'));
    return this.http.post<any>(VOITURES + '/upload', formdata, {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: '' + sessionStorage.getItem('token'),
      }),
      responseType: 'json',
    });
  }
}
