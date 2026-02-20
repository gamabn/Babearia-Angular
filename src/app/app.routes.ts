import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [

  // 🔓 LOGIN (rota pública)
  {
    path: '',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login)
  },

  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/auth/pages/cadastro/cadastro')
        .then(m => m.Cadastro)
  },

  // 🔒 ÁREA LOGADA (layout)
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/pages/layout/layout')
        .then(m => m.Layout),
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/pages/principal/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./dashboard/pages/perfil/perfil/perfil')
            .then(m => m.Perfil)
      },
      {
        path: 'financeiro',
        loadComponent: () =>
          import('./dashboard/pages/financeiro/financas/financas')
            .then(m => m.Financas)
      },
      {
        path: 'barbeiros',
        loadComponent: () =>
          import('./dashboard/pages/barbeiros/barbeiros')
            .then(m => m.Barbeiros)
      },
       {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    ]
  },

  // fallback
 // {
//    path: '**',
//    redirectTo: ''
//  }
];
