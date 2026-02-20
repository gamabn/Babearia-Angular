import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-barbeiros',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './barbeiros.html',
  styleUrl: './barbeiros.css'
})
export class Barbeiros {

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
}
