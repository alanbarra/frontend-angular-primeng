import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public login(dados: any): Observable<any> {
    const service = 'login';
    return this.http.post<any>(this.baseUrl + service, dados);
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
  }
}
