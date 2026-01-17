import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { Cadastro } from './features/pages/cadastro/cadastro';
import { authGuard } from './core/guard/auth.guard';


export const routes: Routes = [
    {
        path: '',
       // canActivate: [authGuard],
        loadComponent: () => import('./features/pages/login/login')
        .then(m=>m.Login)
    },
    {
        path: 'cadastro',
      //  canActivate: [authGuard],
       loadComponent:() => import('./features/pages/cadastro/cadastro').then(m=>m.Cadastro)
    }
];
