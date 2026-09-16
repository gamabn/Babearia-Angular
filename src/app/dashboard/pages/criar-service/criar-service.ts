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
import { CriarServiceBarber } from '../../../core/services/criar-service-barber';
import { Console } from 'console';

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
    private createService: CriarServiceBarber,
  ) {}

  barbeiros: BarberProps[] = [];
  barbeiroId: string | null = null;
  visible: boolean = false;
  serviceBarber: ServiceProps[] = [];
  readonly DollarSignIcon = DollarSign;
  readonly trashIcon = Trash;
  idModal: string | null = null;

  form = new FormGroup({
    idBarberS: new FormControl('', [Validators.required]), // adicionado
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    duration: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  selecionarBarbeiro(id: string) {
    this.barbeiroId = id;
    console.log('Verdadeiro id', id);
    this.form.patchValue({ idBarberS: id }); // insere o ID no formulário
  }

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
    console.log('Dados do formulario', this.form.value);

    // if (this.form.invalid) {
    // this.form.markAllAsTouched();
    // return;
    //}

    //  const { name, price, duration, barberId } = this.form.value;

    const payload = {
      ...this.form.value,
      barberId: this.barbeiroId, // injeta a variável da classe no objeto final
    };

    console.log('Dados enviados:', payload);

    //  this.createService.createServiceId(data).subscribe({
    //  next: (data) => {
    //    console.log('Serviço de um barbeiro', data);
    //   },
    //   error: (err) => {
    //    console.log('Mensagem detalhada do servidor:', err.error);
    //   console.error('Status:', err.status);
    //  },
    //  });
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

    this.selecionarBarbeiro(id);

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

  createServiceIdBarber(data: ServiceProps) {
    //this.createService.createServiceId(data).subscribe({
    // next: (data) => {
    //   console.log('Serviço de um barbeiro', data);
    // },
    // error: (err) => {
    //  console.log('Mensagem detalhada do servidor:', err.error);
    //  console.error('Status:', err.status);
    // },
    // });
  }
}
