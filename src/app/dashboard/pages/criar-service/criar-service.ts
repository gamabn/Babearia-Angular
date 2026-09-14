import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BarbeiroAll } from '../../../core/services/barbeiros';
import { BarberProps } from '../../../features/auth/models/cadastro-model';
import { BarberService } from '../../../core/services/barber-service';
import { ServiceProps } from '../../../features/auth/models/cadastro-model';
import { LucideAngularModule, DollarSign, Trash } from 'lucide-angular';
import { ModalTrash } from '../../../components/modal-trash/modal-trash';

@Component({
  selector: 'app-criar-service',
  imports: [FormsModule, ModalTrash, ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './criar-service.html',
  styleUrl: './criar-service.css',
})
export class CriarService {
  constructor(
    private barber: BarbeiroAll,
    private services: BarberService,
  ) {}

  barbeiros: BarberProps[] = [];
  barbeiroId: string | null = null;
  visible: boolean = false;
  serviceBarber: ServiceProps[] = [];
  readonly DollarSignIcon = DollarSign;
  readonly trashIcon = Trash;
  idModal: string | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
  });

  ngOnInit() {
    this.barber.barbeiros().subscribe({
      next: (data) => {
        this.barbeiros = data; // Apenas carrega a lista de barbeiros
        console.log('Barbeiros carregados:', data);
      },
      error: (err) => {
        console.log('Mensagem detalhada do servidor:', err.error);
        console.error('Status:', err.status);
      },
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description, price } = this.form.value;
  }

  handlOpenModal(id: string) {
    console.log('Id do service', id);
    this.idModal = id;
  }

  handleCloseModal() {
    this.idModal = null;
  }

  handleBarber(id: string) {
    this.barbeiroId = id;
    this.visible = true;

    console.log('Id do barbeiro', this.barbeiroId);

    this.services.handleService(id).subscribe({
      next: (data) => {
        console.log('Serviços do barbeiro', data);
        this.serviceBarber = data;
      },
      error: (err) => {
        console.log('Mensagem detalhada do servidor:', err.error);
        console.error('Status:', err.status);
      },
    });
  }
}
