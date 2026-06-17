import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserStore } from '../../../core/services/user-store';
import { BarbeiroAll } from '../../../core/services/barbeiros';



@Component({
  selector: 'app-barbeiros',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './barbeiros.html',
  styleUrl: './barbeiros.css'
})
export class Barbeiros {

  constructor(private barber: BarbeiroAll, private userStore: UserStore) {}

  barbeiros: any[] = [];
  visible = true;
  preview: string | null = null;
  editingBarber: any | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^(\(\d{2}\)\s?|\d{2}\s?)?\d{9}$/)]),
    image: new FormControl<File | null>(null)
  })

 visibleFalse(){
  this.visible = false;
 }

 visibleTrue(){
  this.visible = true;
  this.editingBarber = null;
  this.form.reset();
  this.preview = null;
 }

 selectBarberToEdit(barber: any) {
  this.visible = true; // Mostra o formulário
  this.editingBarber = barber;

  // Preenche o formulário com os dados do barbeiro
  this.form.patchValue({
    name: barber.name,
    phone: barber.phone
  });

  // Define a imagem de preview, mas não o valor do input de arquivo
  this.preview = barber.image_url;
 }

 onSubmit() {
   if (this.editingBarber) {
     console.log('Atualizando barbeiro:', this.editingBarber.id, this.form.value);
     // Aqui você chamaria seu serviço de atualização
   } else {
     console.log('Criando novo barbeiro:', this.form.value);
     // Aqui você chamaria seu serviço de criação
   }
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
    this.barbeiros = data; // Apenas carrega a lista de barbeiros
    console.log('Barbeiros carregados:', data);

    }
  ,
  error: (err) =>{
    console.log('Mensagem detalhada do servidor:', err.error)
     console.error('Status:', err.status);
  }
 })
}
}
