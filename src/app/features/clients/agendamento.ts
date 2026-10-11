import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Loading } from '../../components/loading/loading/loading';
import { BarberProps } from '../auth/models/cadastro-model';
import { BarbeiroAll } from '../../core/services/barbeiros';

@Component({
  selector: 'app-agendamento',
  imports: [Loading],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.css',
})
export class Agendamento implements OnInit {
  // 🎯 O parâmetro :idClients da rota chega AQUI
  @Input() idClients!: string;

  private http = inject(HttpClient);
  private barbers = inject(BarbeiroAll);

  barbearia = signal<any>(null);
  loading = signal(true);
  erro = signal<string | null>(null);
  barbeiros: BarberProps[] = [];
  barbeiroItem: BarberProps | null = null;

  ngOnInit(): void {
    if (!this.idClients) {
      this.erro.set('Link inválido');
      this.loading.set(false);
      return;
    }
    this.carregarBarbeiros();
    this.carregarBarbearia();
  }

  handleBarber(data: any) {
    console.log('Barbeiro selecionado', data);
    this.barbeiroItem = data;
  }

  carregarBarbeiros(): void {
    this.barbers.barbeirosId(this.idClients).subscribe({
      next: (data) => {
        this.barbeiros = data;
        console.log('barbeiros disponiveis', this.barbeiros);
      },
      error: (err) => {
        console.error('Erro:', err);
        this.erro.set('Barbeiros nao encontrados...');
        this.loading.set(false);
      },
    });
  }

  carregarBarbearia(): void {
    this.http.get(`${environment.apiUrl}/user/${this.idClients}`).subscribe({
      next: (data) => {
        this.barbearia.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro:', err);
        this.erro.set('Barbearia não encontrada');
        this.loading.set(false);
      },
    });
  }
}
