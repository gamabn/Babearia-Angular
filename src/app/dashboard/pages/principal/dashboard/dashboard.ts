import { Component } from '@angular/core';
import { UserStore } from '../../../../core/services/user-store';
import { CadastroModel } from '../../../../features/auth/models/cadastro-model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
constructor(private userStore: UserStore) {}
user: CadastroModel | null = null;

ngOnInit() {
  this.userStore.user$.subscribe(user => {
    this.user = user;
  });
}
}
