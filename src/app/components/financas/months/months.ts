import { Component, OnInit } from '@angular/core';
import { Grafics } from '../grafics/grafics';
import { Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-months',
  imports: [Grafics],
  templateUrl: './months.html',
  styleUrl: './months.css',
})
export class Months implements OnInit {
  agendamentos: any[] = [];
  months: string[] = [];

  constructor(private router: Router) {
    const navegacao = this.router.currentNavigation();
    if (navegacao?.extras.state) {
      this.agendamentos = navegacao.extras.state['agendamentos'];
    }
  }

  montAgrupado(): void {
    const agrupado = this.agendamentos.reduce<Record<string, any>>((acc, ag) => {
      const now = new Date(ag.date_finish);
      const chave = `${now.getMonth() + 1}/${now.getFullYear()}`;

      if (!acc[chave]) {
        acc[chave] = {
          tipo: `Mes - ${chave}`,
          label: format(new Date(ag.date_finish), 'dd/MM/yyyy'),
          ano: new Date(ag.date_agend),
          fim: new Date(ag.date_finish),
          total: 0,
          agendamentos: [],
        };
      }
      acc[chave].agendamentos.push(ag);
      acc[chave].total += Number(ag.total_price ?? 0);
      return acc;
    }, {});
    this.months = Object.values(agrupado);
    console.log('Meses agrupados', this.months);
  }
  ngOnInit(): void {
    this.montAgrupado();
  }
}
