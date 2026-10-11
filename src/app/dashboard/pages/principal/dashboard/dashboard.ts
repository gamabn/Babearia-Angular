import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { UserStore } from '../../../../core/services/user-store';
import { BarberShopResponse } from '../../../../features/auth/models/cadastro-model';
import { Loading } from '../../../../components/loading/loading/loading';

@Component({
  selector: 'app-dashboard',
  imports: [Loading],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private userStore: UserStore,
    private router: Router,
  ) {}

  user: BarberShopResponse | null = null;
  loading = true;

  ngOnInit(): void {
    this.userStore.user$
      .pipe(
        filter((user): user is BarberShopResponse => user !== null && user !== undefined),
        take(1),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
