import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Loading } from '../../components/loading/loading/loading';
import { BarberProps, ServiceProps } from '../auth/models/cadastro-model';
import { BarbeiroAll } from '../../core/services/barbeiros';
import { BarberService } from '../../core/services/barber-service';
import { LucideAngularModule, Scissors, DollarSign, Clock, ListFilter } from 'lucide-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Agendamentos } from '../../core/services/getAgend/agendamentos';

// 1. Importe o arquivo de tradução do português do Brasil
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

@Component({
  selector: 'app-agendamento',
  imports: [Loading, LucideAngularModule, FullCalendarModule],
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.css',
})
export class Agendamento implements OnInit {
  // 🎯 O parâmetro :idClients da rota chega AQUI
  @Input() idClients!: string;
  private agendamentos = inject(Agendamentos);
  private http = inject(HttpClient);
  private barbers = inject(BarbeiroAll);
  private serviceBarber = inject(BarberService);
  readonly Scissors = Scissors;
  readonly DollarSign = DollarSign;
  readonly Clock = Clock;
  readonly ListFilter = ListFilter;

  barbearia = signal<any>(null);
  loading = signal(true);
  erro = signal<string | null>(null);
  barbeiros: BarberProps[] = [];
  barbeiroItem: BarberProps | null = null;
  serviceAllBarber: ServiceProps[] | null = null;
  serviceItem: ServiceProps | null = null;
  agendOcupation: any[] | null = null;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek', // Exibe a semana com grade de horários
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

    // 2. Defina o idioma padrão e a lista de locales disponíveis
    locale: 'pt-br',
    locales: [ptBrLocale],

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth',
    },
    // 1. Personalização dos textos dos botões do topo
    /*
    buttonText: {
      today: 'Hoje',
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
    },
   */
    // 2. Formato de hora nas colunas do calendário (ex: 08:00, 14:30)
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },

    // 3. Formato de hora dentro dos cards de eventos/agendamentos
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },

    slotMinTime: '08:00:00', // Horário de abertura da barbearia
    slotMaxTime: '20:00:00', // Horário de fechamento
    allDaySlot: false,
    selectable: true,
    editable: false,
    // Evento disparado quando o cliente/barbeiro clica em um horário vago
    select: this.handleDateSelect.bind(this),
    // Evento disparado ao clicar em um agendamento já existente
    eventClick: this.handleEventClick.bind(this),
    events: [], // Lista de agendamentos vinda da API
  };

  handleDateSelect(selectInfo: any) {
    const horarioInicio = selectInfo.startStr;
    console.log('Horário selecionado:', horarioInicio);
    // Abrir modal de confirmação de agendamento ou enviar formulário
  }

  handleEventClick(clickInfo: any) {
    alert(`Agendamento selecionado: ${clickInfo.event.title}`);
    // Detalhes do agendamento, opção de cancelar ou remarcar
  }

  ngOnInit(): void {
    if (!this.idClients) {
      this.erro.set('Link inválido');
      this.loading.set(false);
      return;
    }
    this.carregarBarbeiros();
    this.carregarBarbearia();
    this.carregarHorariosOcupados();
  }

  carregarHorariosOcupados() {
    this.agendamentos.agendamentos(this.idClients).subscribe({
      next: (data: any[]) => {
        // Mapeia os dados da API para o formato que o FullCalendar exige (title, start, end)
        const eventosMapeados = data.map((item) => {
          // Define uma cor baseada no status (opcional, para ficar visualmente legal)
          let corEvento = '#2c3e50'; // Padrão
          if (item.status === 'FINALIZADO') {
            corEvento = '#27ae60'; // Verde para finalizados
          }
          return {
            id: item.id,
            title: `${item.client_name} - Barbeiro: ${item.barber_name} (${item.status})`,
            start: item.date_agend, // Mapeia o campo de início do backend
            end: item.date_finish, // Mapeia o campo de término do backend
            backgroundColor: corEvento,
            borderColor: corEvento,
            extendedProps: {
              // Guarda dados extras caso precise usar depois
              telefone: item.client_phone,
              tipo: item.tipo,
              preco: item.total_price,
            },
          };
        });

        // Atribui os eventos processados ao calendário
        this.calendarOptions.events = eventosMapeados;
      },
      error: (erro) => {
        console.log('Erro ao carregar horários agendados:', erro);
      },
    });
  }

  handleBarber(b: any) {
    console.log('Barbeiro selecionado', b);
    this.barbeiroItem = b;

    this.serviceBarber.handleService(b.id).subscribe({
      next: (data) => {
        this.serviceAllBarber = data;
        console.log('Serviços de barbeiros', this.serviceAllBarber);
      },
      error: (err) => {
        console.error('Erro', err);
      },
    });
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

  handleService({ service }: { service: ServiceProps }): void {
    this.serviceItem = service;
    console.log('Serviços selecionados', this.serviceItem);
  }
}
