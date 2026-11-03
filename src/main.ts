import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/services/auth.interceptor';
import { registerLocaleData } from '@angular/common'; // Garanta que essa linha existe
import localePt from '@angular/common/locales/pt'; // Garanta que essa linha existe

// 🌟 ADICIONE ESSA LINHA AQUI EMBAIXO FORÇANDO O 'pt-BR'
registerLocaleData(localePt, 'pt-BR');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
