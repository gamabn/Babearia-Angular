import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../../../core/services/api';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   constructor(private api: Api) {}
 // email = '';
//  password = '';
  posts: any[] = [];
 form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)])
 })

 submit(){
  console.log(this.form.value);
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.api.getPosts().subscribe({
    next: (data) => (this.posts = data),
    error: (err) => console.error('Erro:', err)
  })
 }



   //login(): void {
   // this.api.getPosts().subscribe({
   //   next: (data) => (this.posts = data),
    //  error: (err) => console.error('Erro:', err)
   // });
   // this.email = '';
   // this.password = '';
  //}
}
