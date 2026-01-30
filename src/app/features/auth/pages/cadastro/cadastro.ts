import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Api } from '../../../../core/services/api';
import { CadastroModel } from '../../models/cadastro-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
 constructor(private api: Api, private router: Router) {}



 posts: CadastroModel = {
  name: '',
  phone: '',
  image_url: '',
  email: '',
  neighborhood: '',
  city: '',
  street: '',
  number: '',
  public_id: ''
 };


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
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  city: new FormControl('', [Validators.required]),
  street: new FormControl('', [Validators.required]),
  number: new FormControl('', [Validators.required]),
  neighborhood: new FormControl('', [Validators.required]),
 // estado: new FormControl('', [Validators.required]),
  //telefone: new FormControl('', [Validators.required, this.validarTelefone]),
  phone: new FormControl('', [
  Validators.required,
  Validators.pattern(/^(\(\d{2}\)\s?|\d{2}\s?)?\d{9}$/)
]),
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

//mostrarErro(campo: string, erro: string){
 // return this.form.get(campo)?.hasError(erro);

//}
mostrarErro(campo: string, erro: string): boolean {
  const control = this.form.get(campo);
  return !!(
    control &&
    control.hasError(erro) &&
    (control.touched || control.dirty)
  );
}


 senhaIgualValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('passwordConfirmation')?.value;

  if (!password || !confirm) return null;

  return password === confirm ? null : { senhaDiferente: true };
}

 submit(){


  //console.log(this.form.value);

    if (this.form.invalid) {
      console.warn('Formulário INVÁLIDO. Erros:', this.form.errors);
    // Lista quais campos estão com erro
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) console.log(`Erro no campo ${key}:`, controlErrors);
    });
    this.form.markAllAsTouched();
    return;
  }

  const formData = new FormData();
     const appendIfPresent = (key: string, value: any) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
    }
  };
  // 1. Pegamos os campos de texto e enviamos com os nomes que o back espera
  // Se o back espera 'name' e seu form tem 'nome', ajuste aqui:
    appendIfPresent('name', this.form.get('name')?.value);
    appendIfPresent('email', this.form.get('email')?.value);
    appendIfPresent('password', this.form.get('password')?.value);
    appendIfPresent('phone', this.form.get('phone')?.value);
    appendIfPresent('city', this.form.get('city')?.value);
    appendIfPresent('street', this.form.get('street')?.value);
    appendIfPresent('number', this.form.get('number')?.value);
    appendIfPresent('neighborhood', this.form.get('neighborhood')?.value);

  // 2. A PARTE MAIS IMPORTANTE: O ARQUIVO
  // O primeiro argumento deve ser 'file' para coincidir com o upload.single('file')
  const arquivoImagem = this.form.get('imagem')?.value;
  if (arquivoImagem) {
    formData.append('file', arquivoImagem);
  }
  this.api.createPost(formData).subscribe({
    next: (data) => {
      //this.posts = data;
      alert('Cadastro realizado com sucesso!');
      // Envia para o login
     this.form.reset();
      this.imagemPreview = null;
       this.router.navigate(['/login']);
      console.log('Sucesso!', data);
    }
     ,
    error: (err) =>{
        console.log('Mensagem detalhada do servidor:', err.error)
         console.error('Status:', err.status);
    }


  })
 }

}
