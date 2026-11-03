import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, filter, take, takeUntil } from 'rxjs';
import { UserStore } from '../../../../core/services/user-store';
import { BarberShopResponse } from '../../../../features/auth/models/cadastro-model';
import { Loading } from '../../../../components/loading/loading/loading';
import { GetAgend } from '../../../../core/services/agendamento/get-agend';
import { GetAgendamentoProps } from '../../../../features/auth/models/cadastro-model';
import { LucideAngularModule, User, Scissors, Calendar } from 'lucide-angular';
import { format } from 'date-fns';
import { DatePipe, ɵNullViewportScroller } from '@angular/common';
import { StatusService } from '../../../../core/services/statusAgendamento/status-service';
import { SocketService } from '../../../../core/socket/socket';
import { SomService } from '../../../../core/som/som-service';
import { DeleteAgend } from '../../../../core/services/agendamento/delete-agend';
import { DeletModal } from '../../../../components/delet-modal/delet-modal';

@Component({
  selector: 'app-dashboard',
  imports: [Loading, LucideAngularModule, DatePipe, DeletModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  readonly Scissor = Scissors;
  readonly Calendar = Calendar;
  private sub?: Subscription;

  constructor(
    private userStore: UserStore,
    private router: Router,
    private consultarAgendamento: GetAgend,
    private statusService: StatusService,
    private socketService: SocketService,
    private som: SomService,
    private deleteAgendamento: DeleteAgend,
  ) {}

  user: BarberShopResponse | null = null;
  loading = true;
  agendamentos: GetAgendamentoProps[] = [];
  statusAgend: GetAgendamentoProps[] = [];
  buttonLoading = false;
  idDelete: string | null = null;
  /* status = this.agendamentos
    .filter((a) => a.status === 'AGUARDANDO' && a.tipo === 'AGENDAMENTO')
    .sort((a, b) => {
      const dataA = new Date(a.date_agend).getTime();
      const dataB = new Date(b.date_agend).getTime();
      return dataA - dataB;
    });  */

  formatReal(valor: any) {
    // Se o valor não existir ou for nulo, evita quebrar a tela
    if (!valor) return 'R$ 0,00';

    // Força virar número e formata direto com o JavaScript nativo
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  // 👇 Crie o método
  formatarData(data: Date | string | number): string {
    if (!data) return '';
    return format(new Date(data), 'dd/MM/yyyy HH:mm:ss');
  }

  ngOnInit(): void {
    console.log('🟢 ngOnInit rodou');
    // Garante que os dados do usuário são carregados (ex: após refresh F5)
    this.userStore.loadUser().subscribe();

    this.userStore.user$
      .pipe(
        filter((user): user is BarberShopResponse => user != null),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (user) => {
          this.user = user;
          console.log('USER COMPLETO:', JSON.stringify(user, null, 2));

          const barbeariaId = user?.barbershop?.id ?? (user as any)?.id;
          if (!barbeariaId) {
            console.warn('ID da barbearia não encontrado:', user);
            this.loading = false;
            return;
          }

          // 1) busca agendamentos
          this.consultarAgendamento.consutarAgend(barbeariaId).subscribe({
            next: (data) => {
              this.agendamentos = data || [];
              this.statusAgend = this.agendamentos
                .filter(
                  (a) =>
                    a.status?.toUpperCase() === 'AGUARDANDO' &&
                    a.tipo?.toUpperCase() === 'AGENDAMENTO',
                )
                .sort(
                  (a, b) => new Date(a.date_agend).getTime() - new Date(b.date_agend).getTime(),
                );
              console.log('Agendamentos carregados:', this.statusAgend.length);
              this.loading = false;
            },
            error: (err) => {
              console.error('Erro ao buscar agendamentos', err);
              this.loading = false;
            },
          });

          // 2) SÓ AGORA inscreve no socket, com barbeariaId definido
          this.socketService.emitEvent('entrarBarbearia', barbeariaId);
          this.sub = this.socketService.onEvent<any>('agendamentos').subscribe((msm) => {
            console.log('✅ EVENTO RECEBIDO:', msm);
            const currentId = this.user?.barbershop?.id ?? (this.user as any)?.id;
            if (msm.barbershopId && msm.barbershopId !== currentId) return;
            this.statusAgend.push(msm);
            this.som.tocar();
          });
        },
        error: (err) => {
          console.error('Erro ao carregar usuário:', err);
          this.loading = false;
        },
      });
    (window as any).destravarSom = () => this.som.destravar();
    (window as any).testarSom = () => this.som.tocar();
  }
  //============socket================

  ngOnDestroy(): void {
    console.log('🔴 ngOnDestroy rodou');
    this.destroy$.next();
    this.destroy$.complete();
    this.sub?.unsubscribe();
  }

  abrirModalDeletar(id: string | null) {
    this.idDelete = id; // Isso ativa o @if e envia o ID para o modal
  }

  cancelarExclusao() {
    this.idDelete = null; // Isso remove o modal da tela
  }

  confirmarExclusao() {
    if (!this.idDelete) return;
    const idDelete = this.idDelete;
    this.idDelete = null;
    this.buttonLoading = true;
    const barbeariaId = this.user?.barbershop?.id ?? (this.user as any)?.id;
    this.deleteAgendamento.deleteAgendamento(idDelete, barbeariaId).subscribe({
      next: (data) => {
        console.log('Agendamento deletado', data);
        this.agendamentos = this.agendamentos.filter((a) => a.id !== idDelete);
        this.statusAgend = this.statusAgend.filter((a) => a.id !== idDelete);
        this.buttonLoading = false;
      },
      error: (err) => {
        console.error('Erro ao deletar agendamento', err);
        this.buttonLoading = false;
      },
    });
  }

  mudarStatus(id: string) {
    // console.log('inicio  da mudança');
    if (!id) {
      console.error('Id não encontrado');
      return;
    }
    const barbeariaId = this.user?.barbershop?.id ?? (this.user as any)?.id;
    this.statusService.status(id, 'FINALIZADO', barbeariaId).subscribe({
      next: (data) => {
        console.log('Status atualizado', data);
        this.statusAgend = this.statusAgend.filter((a) => a.id !== id);
      },
      error: (err) => {
        console.error('Erro ao atualizar', err);
      },
    });
  }
}
