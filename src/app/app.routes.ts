import { Routes } from '@angular/router';
import { Login } from './features/pages/login/login';
import { Cadastro } from './features/pages/cadastro/cadastro';


export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'cadastro',
        component: Cadastro
    }
];
