import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public register(user: any): Observable<User> {
    const service = 'register';
    return this.http.post<User>(this.baseUrl + service, user);
  }

  public getProfile(_userId: string): Observable<any> {
    const service = `${'user'}/${_userId}`;
    return this.http.get<User>(this.baseUrl + service);
  }
}
