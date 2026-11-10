import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grafics } from '../grafics/grafics';

@Component({
  selector: 'app-week',
  imports: [Grafics],
  templateUrl: './week.html',
  styleUrl: './week.css',
})
export class Week implements OnInit {
  agendamentos: any[] = [];
  // agendamentosAgrupados: Record<string, any[]> = {};
  agendGroup: any[] = [];

  constructor(private router: Router) {
    const navegacao = this.router.currentNavigation();
    if (navegacao?.extras.state) {
      this.agendamentos = navegacao.extras.state['agendamentos'];
    }
  }
  ngOnInit(): void {
    this.dataAgrupada();
    console.log('Week agrupados', this.agendGroup);
  }

  dataAgrupada(): void {
    const agrupado = this.agendamentos.reduce((grupos: Record<string, any>, agendamento: any) => {
      const valorData =
        agendamento?.date_finish ??
        agendamento?.data ??
        agendamento?.dataAgendamento ??
        agendamento?.dataHora;
      const data = valorData ? new Date(valorData) : null;

      if (!data || Number.isNaN(data.getTime())) {
        // sem data válida, joga num grupo "sem data"
        const chave = 'sem-data';
        if (!grupos[chave]) {
          grupos[chave] = {
            tipo: 'semana',
            label: 'Data não informada',
            inicio: null,
            fim: null,
            total: 0,
            agendamentos: [],
          };
        }
        grupos[chave].agendamentos.push(agendamento);
        grupos[chave].total += Number(agendamento.total_price ?? 0);
        return grupos;
      }

      // 👇 calcula início e fim da semana
      const { inicio, fim } = this.getSemana(data);
      const chave = inicio.toISOString().slice(0, 10); // "2026-11-08"

      if (!grupos[chave]) {
        grupos[chave] = {
          tipo: 'semana',
          label: `${this.formatarData(inicio)} a ${this.formatarData(fim)}`,
          inicio,
          fim,
          total: 0,
          agendamentos: [],
        };
      }

      grupos[chave].agendamentos.push(agendamento);
      grupos[chave].total += Number(agendamento.total_price ?? 0);
      return grupos;
    }, {});

    // ordena por data de início (mais antiga primeiro)
    this.agendGroup = Object.values(agrupado).sort((a: any, b: any) => {
      if (!a.inicio) return 1;
      if (!b.inicio) return -1;
      return a.inicio.getTime() - b.inicio.getTime();
    });

    console.log('Grupos por semana:', this.agendGroup);
  }

  // 👇 domingo a sábado (padrão brasileiro de "semana")
  private getSemana(data: Date): { inicio: Date; fim: Date } {
    const d = new Date(data);
    d.setHours(0, 0, 0, 0);

    const diaDaSemana = d.getDay(); // 0 = domingo, 6 = sábado
    const inicio = new Date(d);
    inicio.setDate(d.getDate() - diaDaSemana); // volta até domingo

    const fim = new Date(inicio);
    fim.setDate(inicio.getDate() + 6); // sábado
    fim.setHours(23, 59, 59, 999);

    return { inicio, fim };
  }

  private formatarData(d: Date): string {
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }
}
