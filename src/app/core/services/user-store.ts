import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { CadastroModel, BarberShopResponse } from '../../features/auth/models/cadastro-model';
import { isPlatformBrowser } from '@angular/common';
import { ServiceToken } from './token/service-token';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  // private userSubject = new BehaviorSubject<any | null>(null);
  private baseUrl = 'http://localhost:3333';
  private userSubject = new BehaviorSubject<BarberShopResponse | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private serviceToken: ServiceToken,
  ) {}

  setUser(user: BarberShopResponse | null) {
    this.userSubject.next(user);
  }

  loadUser(): Observable<BarberShopResponse | null> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(null);
    }

    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return of(null);
    // }

    return this.http.get<BarberShopResponse>(`${this.baseUrl}/user/detail`).pipe(
      tap((user) => this.setUser(user)),
      catchError(() => {
        //  this.clear();
        return of(null);
      }),
    );
  }

  clear() {
    this.userSubject.next(null);
    this.serviceToken.clearToken();
    localStorage.removeItem('token');
  }
}
