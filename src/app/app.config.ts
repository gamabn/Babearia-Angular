import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  LOCALE_ID,
} from '@angular/core';

import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http'; // 1. Importe
import { authInterceptor } from './core/services/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
//import { ionListSharp } from '@ng-icons/core/ionicons-sharp';
import {
  ionAdd,
  ionMenu,
  ionClose,
  ionBarChart,
  ionConstruct,
  ionLogInOutline,
  ionPersonCircleOutline,
  ionPower,
  ionCut,
  ionBuildOutline,
} from '@ng-icons/ionicons';
import { UserStore } from './core/services/user-store';
//import { firstValueFrom } from 'rxjs'

export function initUser(userStore: UserStore) {
  return () =>
    userStore
      .loadUser()
      .toPromise()
      .catch(() => {});
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    //provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), // 2. Adicione aqui
    provideCharts(withDefaultRegisterables()),
    //  provideHttpClient(withInterceptorsFromDi()),
    // { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
    provideIcons({
      ionAdd,
      ionMenu,
      ionClose,
      ionBarChart,
      ionConstruct,
      ionLogInOutline,
      ionPersonCircleOutline,
      ionPower,
      ionCut,
      ionBuildOutline,
    }),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
};
