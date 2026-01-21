import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Cadastro } from './features/auth/pages/cadastro/cadastro';
import { authGuard } from './core/guard/auth.guard';


export const routes: Routes = [
    {
        path: '',
       // canActivate: [authGuard],
        loadComponent: () => import('./features/auth/pages/login/login')
        .then(m=>m.Login)
    },
    {
        path: 'cadastro',
      //  canActivate: [authGuard],
       loadComponent:() => import('./features/auth/pages/cadastro/cadastro').then(m=>m.Cadastro)
    }
];
