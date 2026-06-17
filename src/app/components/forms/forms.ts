import { Component } from '@angular/core';
import { UserStore } from '../../core/services/user-store';
import { BarbeiroAll } from '../../core/services/barbeiros';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms',
  imports: [ FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms {
 constructor(private barber: BarbeiroAll, private userStore: UserStore) {}


  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^(\(\d{2}\)\s?|\d{2}\s?)?\d{9}$/)]),
    image: new FormControl<File | null>(null)

  })

  preview: string | null = null;
  visible = true;


 changeVisible(){
  this.visible = !this.visible;
 }

 visibleFalse(){
  this.visible = false;
 }

 visibleTrue(){
  this.visible = true;
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
    this.preview = reader.result as string;
  };
  reader.readAsDataURL(file);
}

ngOnInit() {
 this.barber.barbeiros().subscribe({
  next:(data)=>{
    console.log('Sucesso', data);
    if(data.length > 0){
      this.form.patchValue({
        name: data[0].name,
        phone: data[0].phone,
        image: data[0].image_url
      })
    }

    }
  ,
  error: (err) =>{
    console.log('Mensagem detalhada do servidor:', err.error)
     console.error('Status:', err.status);
  }
 })
}
}


