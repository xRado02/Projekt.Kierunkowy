import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
