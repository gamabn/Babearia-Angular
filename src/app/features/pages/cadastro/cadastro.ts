import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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

 validarTelefone(control: AbstractControl): ValidationErrors | null {
   const value = control.value;
   if (!value) return null;

   const valid =
     /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || // (DD) 999999999
     /^\d{2}\s\d{9}$/.test(value) ||           // DD 999999999
     /^\d{11}$/.test(value);                   // 11999999999

   return valid ? null : { telefoneInvalido: true };
 }

 form = new FormGroup({
  nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  city: new FormControl('', [Validators.required]),
  street: new FormControl('', [Validators.required]),
  number: new FormControl('', [Validators.required]),
  neighborhood: new FormControl('', [Validators.required]),
  estado: new FormControl('', [Validators.required]),
  //telefone: new FormControl('', [Validators.required, this.validarTelefone]),
  telefone: new FormControl('', [
  Validators.required,
  Validators.pattern(/^(\(\d{2}\)\s?|\d{2}\s?)?\d{9}$/)
]),
  cep: new FormControl('', [Validators.required]),
  imagem: new FormControl<File | null>(null)
 },{ validators: this.senhaIgualValidator })

 imagemPreview: string | null = null;

onImagemSelecionada(event: Event) {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  // Salva o arquivo no form (para envio backend)
  this.form.patchValue({
    imagem: file
  });

  // Preview da imagem
  const reader = new FileReader();
  reader.onload = () => {
    this.imagemPreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}

mostrarErro(campo: string, erro: string){
  return this.form.get(campo)?.hasError(erro);

}

 senhaIgualValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('passwordConfirmation')?.value;

  if (!password || !confirm) return null;

  return password === confirm ? null : { senhaDiferente: true };
}

 submit(){
  console.log(this.form.value);
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
 }
}
