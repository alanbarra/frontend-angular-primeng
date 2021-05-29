import { Lista } from './../models/lista.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public create(lista: any): Observable<Lista> {
    const service = 'listas';
    return this.http.post<Lista>(this.baseUrl + service, lista);
  }

  public read(): Observable<Lista[]> {
    const service = 'listas';
    return this.http.get<Lista[]>(this.baseUrl + service);
  }

  public readById(_id: string): Observable<Lista> {
    const service = `${'listas'}/${_id}`;
    return this.http.get<Lista>(this.baseUrl + service);
  }

  public update(lista: any, _id: any): Observable<Lista> {
    const service = `${'listas'}/${_id}`;
    return this.http.put<Lista>(this.baseUrl + service, lista);
  }

  public delete(_id: string): Observable<Lista> {
    const service = `${'listas'}/${_id}`;
    return this.http.delete<Lista>(this.baseUrl + service);
  }
}
