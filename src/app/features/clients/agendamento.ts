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
import { AgendamentoProps } from '../auth/models/cadastro-model';
import { Status } from '../auth/models/cadastro-model';

// 1. Importe o arquivo de tradução do português do Brasil
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { title } from 'node:process';

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
  horario: string | null = null;

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
    //=========================================
    // eventClick: this.handleEventClick.bind(this),
    //====================================================
    events: [], // Lista de agendamentos vinda da API
  };

  handleDateSelect(selectInfo: any) {
    const horarioInicio = selectInfo.startStr;
    const dataSelecionada = new Date(horarioInicio);
    const agora = new Date();
    console.log('Horário vago selecionado:', typeof horarioInicio);

    // 3. Compara utilizando os milissegundos (.getTime()) para garantir precisão
    if (dataSelecionada.getTime() < agora.getTime()) {
      console.log('Tentativa de agendar em horário passado bloqueada.');
      selectInfo.view.calendar.unselect(); // Limpa a seleção visual
      return; // Interrompe a execução
    }
    this.horario = horarioInicio;
    console.log('Horas selecionada', this.horario);

    // 1. Pega a instância do calendário que disparou o clique
    const calendarApi = selectInfo.view.calendar;
    // Adicione aqui o alerta ou a abertura do seu modal de agendamento:

    // 2. Remove o quadrado azul anterior (se o usuário clicar em outro horário)
    const eventoAntigo = calendarApi.getEventById('temp-click');
    if (eventoAntigo) {
      eventoAntigo.remove();
    }

    // 3. Pinta o novo quadrado de azul imediatamente no clique!
    calendarApi.addEvent({
      id: 'temp-click',
      title: 'Selecionado 🕒',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      backgroundColor: '#0e45eb', // Sua cor azul
      borderColor: '#0e45eb',
    });

    // Limpa a seleção cinza nativa para destacar apenas o seu bloco azul
    calendarApi.unselect();

    // Se você tiver um modal, pode abrir ele aqui embaixo normalmente:
    // this.abrirModalCadastro(horarioInicio);
  }

  // handleEventClick(clickInfo: any) {
  // alert(`Você selecionou o horário para agendamento: ${clickInfo.event.title}`);
  // }

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
      next: (data: AgendamentoProps[]) => {
        // Mapeia os dados da API para o formato que o FullCalendar exige (title, start, end)
        const eventosMapeados = data.map((item: AgendamentoProps) => {
          // 👀 Adicione este log para ver exatamente o que o backend está enviando no status
          console.log(`ID: ${item.id} | Status recebido: "${item.status}"`);
          // Define uma cor baseada no status (opcional, para ficar visualmente legal)
          const agora = new Date();
          const dataAgendamento = new Date(item.date_agend);

          let corEvento = '#2c3e50';
          let corTexto = '#ffffff';

          // Usamos toUpperCase() e trim() para evitar problemas com espaços ou letras minúsculas
          const statusLimpo = item.status ? item.status.trim().toUpperCase() : '';

          // 1. Se estiver FINALIZADO, pinta de preto fosco
          if (statusLimpo === 'FINALIZADO') {
            corEvento = '#1a1a1a';
            corTexto = '#ffffff';
          }
          // 2. Se estiver AGUARDANDO, você pode usar outra cor (ex: azul escuro original ou outra cor de sua preferência)
          else if (statusLimpo === 'AGUARDANDO') {
            corEvento = '#2c3e50'; // Mantém o tom padrão ou mude para outra cor se quiser diferenciar
            corTexto = '#ffffff';
          }
          // 3. Se a data já passou e não foi finalizado/atendido
          else if (dataAgendamento < agora) {
            corEvento = '#e2e8f0'; // Cinza claro
            corTexto = '#64748b';
          }

          // Lógica para verificar se o agendamento já passou da data/hora atual

          return {
            id: item.id,
            //  title: `${item.client_name} - Barbeiro: ${item.barber_name} (${item.status})`,
            // title: `${item.status}`,
            start: item.date_agend, // Mapeia o campo de início do backend
            end: item.date_finish, // Mapeia o campo de término do backend
            backgroundColor: corEvento,
            borderColor: corEvento === '#e2e8f0' ? '#cbd5e1' : corEvento,
            textColor: corTexto,
            // borderColor: corEvento,
            extendedProps: {
              // Guarda dados extras caso precise usar depois
              telefone: item.client_phone,
              tipo: item.tipo,
              preco: item.total_price,
            },
          };
        });

        // Atribui os eventos processados ao calendário
        //  this.calendarOptions.events = eventosMapeados;
        // 🔄 ESSA LINHA É A CHAVE: Recria o objeto e força o calendário a renderizar os eventos
        this.calendarOptions = {
          ...this.calendarOptions,
          events: eventosMapeados,
        };
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
