import { Component, OnInit } from '@angular/core';
import { Grafics } from '../grafics/grafics';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-day',
  imports: [Grafics, DatePipe],
  templateUrl: './day.html',
  styleUrl: './day.css',
})
export class Day implements OnInit {
  agendamentos: any[] = [];
  agendGroup: any[] = [];

  constructor(private router: Router) {
    const navegacao = this.router.currentNavigation();
    if (navegacao?.extras.state) {
      this.agendamentos = navegacao.extras.state['agendamentos'];
    }
  }

  dataAgrupada(): void {
    const agrupado = this.agendamentos.reduce<Record<string, any>>((acc, ag) => {
      const day = new Date(ag.date_finish);
      const chave = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;

      if (!acc[chave]) {
        acc[chave] = {
          tipo: 'dia',
          label: format(new Date(ag.date_finish), 'dd/MM/yyyy'),
          ano: new Date(ag.date_agend),
          fim: new Date(ag.date_finish),
          total: 0,
          agendamentos: [],
        };
      }
      acc[chave].agendamentos.push(ag);
      acc[chave].total += Number(ag.total_price ?? 0); // 👈 soma o total
      return acc;
    }, {});

    // 👇 converte o objeto em array (se o template espera array)
    this.agendGroup = Object.values(agrupado);
    console.log('Agrupado:', this.agendGroup);
  }
  ngOnInit(): void {
    console.log('Todos os agendamentos', this.agendamentos);
    this.dataAgrupada();
  }
}
