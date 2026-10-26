import { Component, inject, Input, OnInit, signal, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Loading } from '../../loading/loading/loading';
import { Client } from '../../../core/services/cliente/client';
import { error } from 'console';

@Component({
  selector: 'app-cliente-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cliente-login.html',
  styleUrl: './cliente-login.css',
})
export class ClienteLogin implements OnInit {
  loading = signal(false);
  erro = signal<string | null>(null);
  @Input() idClients!: string;
  @Output() cadastrado = new EventEmitter<void>(); // 👈
  private client = inject(Client);

  ngOnInit(): void {
    if (!this.idClients) {
      this.erro.set('Link inválido');
      this.loading.set(true);
    }
  }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^(\(\d{2}\)\s?|\d{2}\s?)?\d{9}$/),
    ]),
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('formulario invalido');
      return;
    }

    console.log('Id do barbeiro', this.idClients);
    const { nome, telefone } = this.form.value;

    console.log('nome do cliente', nome);

    this.client
      .client({ name: nome!, client_phone: telefone!, barbearia_id: this.idClients })
      .subscribe({
        next: (data) => {
          console.log('Cadastro do cliente', data);
          localStorage.setItem('client', JSON.stringify(data));
          this.cadastrado.emit(); // 👈 avisa o pai
        },
        error: (err: HttpErrorResponse) => {
          console.log('status:', err.status);
          console.log('corpo do erro:', err.error); // Informação chave aqui
        },
      });
  }
}
