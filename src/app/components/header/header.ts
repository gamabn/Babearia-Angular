import { Component } from '@angular/core';
import { UserStore } from '../../core/services/user-store';
import { CadastroModel } from '../../features/auth/models/cadastro-model';
import { NgIconsModule } from '@ng-icons/core';
import { provideIcons } from '@ng-icons/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { trigger,transition, style, animate } from '@angular/animations';
import { Perfil } from '../../dashboard/pages/perfil/perfil/perfil';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconsModule, CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  animations: [
   // trigger('backdrop', [
    //  transition(':enter', [
    //    style({ opacity: 0 }),
    //    animate('3000ms ease-out', style({ opacity: 1 }))
    //  ]),
    //  transition(':leave', [
    //    animate('3000ms ease-in', style({ opacity: 0 }))
    //  ])
  //  ]),

    trigger('menuSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})

export class Header {
menuAberto = false;
  constructor(private userStore: UserStore, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuAberto = false;
      });
  }

  user: CadastroModel | null = null;

irPara(rota: string) {
  this.router.navigate([rota]);
  this.menuAberto = false;
}
ngOnInit() {
  this.userStore.user$.subscribe(user => {
    this.user = user;
    console.log('Usuario logado:',this.user);

  });
}



getAvatar(url?: string): string {
  if (!url) return 'avatar-default.png';

  // se já vier transformada, retorna
  if (url.includes('/upload/w_')) return url;

  return url.replace(
    '/upload/',
    '/upload/w_80,h_80,c_fill,f_auto,q_auto/'
  );
}

  abrirMenu() {
    this.menuAberto = true;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  logout() {
  this.userStore.clear();
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('Logout realizado com sucesso');
  this.router.navigate(['/']);

}
}
