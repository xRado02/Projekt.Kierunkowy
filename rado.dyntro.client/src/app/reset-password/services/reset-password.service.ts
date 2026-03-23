import { Injectable } from '@angular/core';
import { UserResetPassword } from '../../core/interfaces/UserResetPassword';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  putResetPassword(user: Partial<UserResetPassword>): Observable<UserResetPassword> {
    return this.http.put<UserResetPassword>('/api/Auth/reset-password', user);
  }

  validateResetPasswordToken(token: string) {
    return this.http.get(`/api/auth/validate-reset-password-token`, {
      params: { token },
      responseType: 'text'
    });
  }

}
