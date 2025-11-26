import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthApi } from '../services/auth.api';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const api  = inject(AuthApi);

  if (api.isLoggedIn() && req.url.includes('/private/')) {
    const newRequest = req.clone({ setHeaders: { Auhorization: `Bearer ${api.getToken()}` }});
    // newRequest.headers.set('Auhorization', `Bearer ${api.getToken()}`);
    return next(newRequest);
  }
  return next(req);
};
