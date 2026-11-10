import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';
import { Detail } from '../../../../core/services/detail';
import { Router, NavigationCancel, NavigationError } from '@angular/router';
import { UserStore } from '../../../../core/services/user-store';
import { CadastroModel } from '../../../../features/auth/models/cadastro-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private api: Auth,
    private router: Router,
    private detail: Detail,
    private userStore: UserStore,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationCancel) {
        console.warn('🚫 Navegação cancelada:', event.reason);
        console.warn('Código:', event.code);
      }

      if (event instanceof NavigationError) {
        console.error('❌ Erro na navegação:', event.error);
      }
    });
  }

  // user: CadastroModel | null = null;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.api
      .login({
        email: email!,
        password: password!,
      })
      .subscribe({
        next: (data) => {
          console.log('✅ Login realizado com sucesso');

          this.userStore.loadUser().subscribe({
            next: async (user) => {
              console.log('✅ Usuário carregado:', user);

              try {
                const navegou = await this.router.navigate(['/app/dashboard']);

                console.log('🚀 Navegação realizada:', navegou);
              } catch (error) {
                console.error('❌ Erro na navegação:', error);
              }
            },

            error: (err) => {
              console.error('❌ Erro ao carregar usuário:', err);
            },
          });
        },

        error: (err) => {
          console.error('❌ Erro no login:', err);
        },
      });
  }
}
