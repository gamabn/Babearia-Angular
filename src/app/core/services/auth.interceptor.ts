import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ServiceToken } from './token/service-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const serviceToken = inject(ServiceToken);

  const token = serviceToken.getToken();

  console.log('🛡️ INTERCEPTOR:', req.url);
  console.log('🔑 Token disponível:', !!token);

  // Somente o backend autorizado deve receber o token.
  const isBackend = req.url.startsWith('http://localhost:3333/');

  // O login não precisa de Bearer.
  const isLogin = new URL(req.url, 'http://localhost:4200').pathname === '/login';

  if (isBackend && !isLogin) {
    req = req.clone({
      ...(token
        ? {
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}),
      ...(isPlatformBrowser(platformId) ? { withCredentials: true } : {}),
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('❌ Não autorizado:', req.url);
      }

      return throwError(() => error);
    }),
  );
};
