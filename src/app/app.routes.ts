import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { Cadastro } from './features/pages/cadastro/cadastro';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/pages/login/login')
        .then(m=>m.Login)
    },
    {
        path: 'cadastro',
       loadComponent:() => import('./features/pages/cadastro/cadastro').then(m=>m.Cadastro)
    }
];
