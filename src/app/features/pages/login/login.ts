import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../../core/services/api';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  posts: any[] = [];

   constructor(private api: Api) {}

   //login(): void {
   // this.api.getPosts().subscribe({
   //   next: (data) => (this.posts = data),
    //  error: (err) => console.error('Erro:', err)
   // });
   // this.email = '';
   // this.password = '';
  //}
}
