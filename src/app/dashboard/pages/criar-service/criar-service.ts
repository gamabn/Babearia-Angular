import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarbeiroAll } from '../../../core/services/barbeiros';
import { BarberProps } from '../../../features/auth/models/cadastro-model';

@Component({
  selector: 'app-criar-service',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './criar-service.html',
  styleUrl: './criar-service.css'
})
export class CriarService {

  constructor( private barber: BarbeiroAll ) {}

  barbeiros: BarberProps[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
  });

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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description, price } = this.form.value;
  }

}
