import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { Cadastro } from './features/auth/pages/cadastro/cadastro';
import { authGuard } from './core/guard/auth.guard';
import { Dashboard } from './dashboard/pages/principal/dashboard/dashboard';



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
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./dashboard/pages/principal/dashboard/dashboard').then(m=>m.Dashboard)
    }
];
