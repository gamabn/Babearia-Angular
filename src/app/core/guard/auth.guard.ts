import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ServiceToken } from '../services/token/service-token';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const serviceToken = inject(ServiceToken);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = serviceToken.getToken();

  console.log('🛡️ GUARD: Token disponível:', !!token);

  if (token) {
    return true;
  }

  return router.createUrlTree(['/']);
};
