import { APP_INITIALIZER, ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // 1. Importe
import { authInterceptor } from './core/services/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideIcons } from '@ng-icons/core';
//import { ionListSharp } from '@ng-icons/core/ionicons-sharp';
import { ionAdd, ionMenu, ionClose, ionBarChart,ionConstruct, ionLogInOutline, ionPersonCircleOutline, ionPower,ionCut} from '@ng-icons/ionicons';
import { UserStore } from './core/services/user-store';
import { firstValueFrom } from 'rxjs';

export function initUser(userStore: UserStore){
  return () => userStore.loadUser().toPromise().catch(() => {});
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    //provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), // 2. Adicione aqui
     provideIcons({
        ionAdd, ionMenu, ionClose,ionBarChart, ionConstruct, ionLogInOutline, ionPersonCircleOutline, ionPower,
        ionCut


    }),
     provideAnimations(),

  ]
};
