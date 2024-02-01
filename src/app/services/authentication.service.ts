import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
 // private apiUrl = 'http://localhost:3000/api';
  private apiUrl = 'http://192.168.0.112:3066/api/Auth';

  constructor(private http: HttpClient) {}

  login(LoginId: string, InitialPssword: string): Observable<any> {
    const loginData = { LoginId, InitialPssword };
    //return this.http.post(`${this.apiUrl}/login`, { username, password });
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
}