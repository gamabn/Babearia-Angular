import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';
import { Detail } from '../../../../core/services/detail';
import { Router } from '@angular/router';
import { UserStore } from '../../../../core/services/user-store';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private api: Auth, private router: Router, private detail: Detail, private userStore: UserStore) {}

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

        this.detail.detail(data.id).subscribe({
          next: (data) => {
            this.userStore.setUser(data);
          }
        })

        // (opcional) salvar dados do usuário
        localStorage.setItem('user', JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email
        }));
        this.router.navigate(['/dashboard']);
        console.log('Login realizado com sucesso', data);
      },
      error: (err) => {
        console.error('Erro no login', err);
      }
    });
  }
}
