import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';
import { Detail } from '../../../../core/services/detail';
import { Router } from '@angular/router';
import { UserStore } from '../../../../core/services/user-store';
import { CadastroModel } from '../../../../features/auth/models/cadastro-model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private api: Auth, private router: Router, private detail: Detail, private userStore: UserStore) {}
 // user: CadastroModel | null = null;


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.api.login({
      email: email!,
      password: password!
    }).subscribe({
      next: (data) => {
        // ✅ salvar token
        localStorage.setItem('token', data.token);
        //this.userStore.loadUser();
       // this.userStore.setUser(data.user);
      //this.router.navigate(['/app/dashboard']);

      //===============================================================================
     // localStorage.setItem('token', data.token);

    // 🔥 garante que o store esteja atualizado
  //  this.userStore.setUser(data.user);

    // 🔥 navega só depois
  //  queueMicrotask(() => {
  //    this.router.navigate(['/app/dashboard']);
   // });
//====================================================================


      //==========================================
    this.userStore.loadUser().subscribe(() => {
      this.router.navigate(['/app/dashboard']);
   });
//====================================================

            // (opcional) salvar dados do usuário


        console.log('Login realizado com sucesso', data);
      },
      error: (err) => {
        console.error('Erro no login', err);
      }
    });
  }
}
