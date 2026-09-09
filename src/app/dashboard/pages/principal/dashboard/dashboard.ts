import { Component } from '@angular/core';
import { UserStore } from '../../../../core/services/user-store';
import { CadastroModel,BarberShopResponse } from '../../../../features/auth/models/cadastro-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
constructor(private userStore: UserStore, private router:  Router) {}
user: BarberShopResponse | null = null;

ngOnInit() {
  this.userStore.user$.subscribe(user => {
    this.user = user;
    console.log('Dados carregados no Dashboard:', this.user);
  });
}

}
