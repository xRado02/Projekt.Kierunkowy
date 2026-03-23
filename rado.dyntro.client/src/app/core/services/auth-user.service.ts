import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from '../interfaces/UserAuth';
import { TokenResponse } from '../interfaces/TokenResponse';
import { HttpClient } from '@angular/common/http';
import { UserResetPassword } from '../interfaces/UserResetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private http: HttpClient) { }

  loginUser(userData: UserAuth): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`/api/Auth/login`, userData);
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
  }

  getUserRole(): string | null {
    const token = sessionStorage.getItem('accessToken')
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);
    return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

  getUserId(): string | null {
    const token = sessionStorage.getItem('accessToken')
    if (!token) {
      return null
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;

  }

  sendResetEmail(newUser: Partial<UserResetPassword>): Observable<UserResetPassword> {
    return this.http.post<UserResetPassword>('/api/emailsender/reset', newUser);
  }

  

}
