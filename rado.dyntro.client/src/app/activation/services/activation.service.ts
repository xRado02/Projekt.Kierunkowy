import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserActivate } from '../models/UserActivate'

@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  

  constructor(private http: HttpClient) { }


  putActivateAccount(user: Partial<UserActivate>): Observable<UserActivate> {
    return this.http.put<UserActivate>('/api/Auth/activate', user);
  }


}
