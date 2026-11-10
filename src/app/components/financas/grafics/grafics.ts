import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-grafics',
  imports: [BaseChartDirective],
  templateUrl: './grafics.html',
  styleUrl: './grafics.css',
})
export class Grafics implements OnChanges {
  @Input() agendamentos: any[] = [];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Faturamento (R$)',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Faturamento por dia' },
    },
    scales: { y: { beginAtZero: true } },
  };

  public barChartType = 'bar' as const;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Grafico', changes);
    if (changes['agendamentos'] && this.agendamentos?.length) {
      this.barChartData = {
        labels: this.agendamentos.map((a) => a.label),
        datasets: [
          {
            data: this.agendamentos.map((a) => a.total),
            label: 'Faturamento (R$)',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    }
  }
}
