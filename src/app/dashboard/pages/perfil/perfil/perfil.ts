import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserStore } from '../../../../core/services/user-store';
import { CadastroModel } from '../../../../features/auth/models/cadastro-model';
import { EditBarber } from '../../../../core/services/edit-barber';


@Component({
  selector: 'app-perfil',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,

  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {


  constructor(private userStore: UserStore,  private editBarber: EditBarber) {}

  barbearia: CadastroModel | null = null;
  loading = false

  form = new FormGroup({
    id: new FormControl(''),
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
  if (!user) return;
  this.barbearia = user
  this.imagemPreview = this.getAvatar(this.barbearia?.image_url);
  console.log('Usuario funcionando:',this.barbearia);
  this.preencherFormulario(this.barbearia);

    })
   }

preencherFormulario(barbearia: any) {
  this.form.patchValue({
    name: barbearia.name,
    email: barbearia.email,
    city: barbearia.city,
    neighborhood: barbearia.neighborhood,
    street: barbearia.street,
    number: barbearia.number,
    phone: barbearia.phone
  });
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
    this.loading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
   console.log(this.form.value);

   const formData: FormData = new FormData();
    formData.append('name', this.form.get('name')?.value ?? '');
    formData.append('email', this.form.get('email')?.value ?? '');
    formData.append('phone', this.form.get('phone')?.value ?? '');
    formData.append('city', this.form.get('city')?.value ?? '');
    formData.append('street', this.form.get('street')?.value ?? '');
    formData.append('number', this.form.get('number')?.value ?? '');
    formData.append('neighborhood', this.form.get('neighborhood')?.value ?? '');

    if(this.form.value.image){
       formData.append('file', this.form.get('image')?.value ?? '');
    }

     this.editBarber.edit(this.barbearia?.id ?? '', formData)
     .subscribe({
      next: (data) =>{
         console.log('Sucesso!', data);
         this.loading = false;
       // alert('Perfil atualizado com sucesso!')
        //window.location.reload();

      }
      ,
   error: (err) =>{
        console.log('Mensagem detalhada do servidor:', err.error)
        this.loading = false;
         console.error('Status:', err.status);
    }
     })

  }
}
