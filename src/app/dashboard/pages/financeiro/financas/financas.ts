import { Component, OnInit } from '@angular/core';
import { Loading } from '../../../../components/loading/loading/loading';
import { CommonModule } from '@angular/common';
import { Calendar, Scissors, DollarSign, LucideAngularModule } from 'lucide-angular';
import { GetAgend } from '../../../../core/services/agendamento/get-agend';
import { UserStore } from '../../../../core/services/user-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-financas',
  imports: [Loading, RouterLink, CommonModule, LucideAngularModule],
  templateUrl: './financas.html',
  styleUrl: './financas.css',
})
export class Financas implements OnInit {
  readonly Scissor = Scissors;
  readonly Calendar = Calendar;
  readonly DollarSign = DollarSign;

  barbearia: any = null;
  now = new Date();
  agendamentosFinalizados: any[] = [];

  totalDay = 0;
  totalWeek = 0;
  totalMonth = 0;

  weekDays = this.getWeekDays(this.now);
  mes = this.now.getMonth() + 1;
  ano = this.now.getFullYear();

  constructor(
    private consultarAgendamento: GetAgend,
    private userStore: UserStore,
  ) {}

  ngOnInit(): void {
    this.userStore.user$.subscribe((user) => {
      if (!user) return;
      this.barbearia = user;

      this.consultarAgendamento.consutarAgend(this.barbearia?.barbershop?.id).subscribe({
        next: (agendamentos) => {
          // console.log('Agendamentos:', agendamentos);

          // Só os finalizados
          const finalizados = agendamentos.filter((a) => a.status === 'FINALIZADO');
          this.agendamentosFinalizados = finalizados;

          // --- DIA ---
          this.totalDay = finalizados
            .filter((a) => this.isMesmoDia(new Date(a.date_finish), this.now))
            .reduce((total, a) => total + Number(a.total_price), 0);

          // --- SEMANA ---
          this.totalWeek = finalizados
            .filter((a) => this.isMesmaSemana(new Date(a.date_finish), this.now))
            .reduce((total, a) => total + Number(a.total_price), 0);

          // --- MÊS ---
          this.totalMonth = finalizados
            .filter((a) => this.isMesmoMes(new Date(a.date_finish), this.now))
            .reduce((total, a) => total + Number(a.total_price), 0);

          //console.log('Dia:', this.totalDay);
          //console.log('Semana:', this.totalWeek);
          //console.log('Mês:', this.totalMonth);
        },
        error: (err) => {
          console.error('Erro ao consultar agendamentos:', err);
        },
      });
    });
  }

  // ---------- HELPERS DE DATA ----------

  private isMesmoDia(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private isMesmoMes(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  }

  private isMesmaSemana(a: Date, b: Date): boolean {
    // Semana de domingo a sábado (padrão do getDay: 0 = domingo)
    const startA = this.startOfWeek(a);
    const startB = this.startOfWeek(b);
    return startA.getTime() === startB.getTime();
  }

  private startOfWeek(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - d.getDay()); // volta até domingo
    return d;
  }

  getWeekDays(date: Date): Date[] {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  }
}
