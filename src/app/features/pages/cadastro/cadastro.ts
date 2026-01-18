import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule,FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
 constructor(private api: Api) {}

 form = new FormGroup({
  nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  city: new FormControl('', [Validators.required]),
  street: new FormControl('', [Validators.required]),
  number: new FormControl('', [Validators.required]),
  neighborhood: new FormControl('', [Validators.required]),
  estado: new FormControl('', [Validators.required]),
 telefone: new FormControl('', [Validators.required]),
  imagem: new FormControl('', [Validators.required])
 })

 submit(){
  console.log(this.form.value);
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
 }
}
