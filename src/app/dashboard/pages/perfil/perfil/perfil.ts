import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../../../core/services/user-store';
import { CadastroModel } from '../../../../features/auth/models/cadastro-model';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,

  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {


  constructor(private userStore: UserStore) {}
  barbearia: CadastroModel | null = null;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.pattern(/^(\(\d{2}\)\s?|\d{2}\s?)?\d{9}$/), Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    image: new FormControl<File | null>(null)
  });

 imagemPreview: string | null = null;



ngOnInit(){
 this.userStore.user$.subscribe(user => {
  this.barbearia = user
  this.imagemPreview = this.getAvatar(this.barbearia?.image_url);
  console.log('Usuario funcionando:',this.barbearia);
    })
   }

   validationErro(campo: string, erro: string){
    const control = this.form.get(campo)
    return !!(
      control &&
      control.hasError(erro) &&
      (control.touched || control.dirty))

   }

   mudarImagem(event: Event){
     const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];

  // Salva o arquivo no form (para envio backend)
  this.form.patchValue({
    image: file
  });

  // Preview da imagem
  const reader = new FileReader();
  reader.onload = () => {
    this.imagemPreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}


    // Preview da imagem

   getAvatar(url?: string): string {
  if (!url) return 'avatar-default.png';

  // se já vier transformada, retorna
  if (url.includes('/upload/w_')) return url;

  return url.replace(
    '/upload/',
    '/upload/w_80,h_80,c_fill,f_auto,q_auto/'
  );
}

   submit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 console.log(this.form.value);

  }
}
