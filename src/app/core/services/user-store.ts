import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { CadastroModel } from '../../features/auth/models/cadastro-model';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class UserStore {
  // private userSubject = new BehaviorSubject<any | null>(null);
   private baseUrl = 'http://localhost:3333';
   private userSubject = new BehaviorSubject<CadastroModel | null>(null);
   user$ = this.userSubject.asObservable();


  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}
  //  const token = localStorage.getItem('token');

    // if (token) {
    //  this.http.get<CadastroModel>('/user/detail').subscribe({
    //    next: user => this.userSubject.next(user),
    //    error: () => this.clear()
    //  });
   // }
   setUser(user: CadastroModel | null) {
    this.userSubject.next(user);
  }

  loadUser(): Observable<CadastroModel | null> {
  if (!isPlatformBrowser(this.platformId)) {
    return of(null);
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return of(null);
  }

  return this.http.get<CadastroModel>(`${this.baseUrl}/user/detail`).pipe(
    tap(user => this.setUser(user)),
    catchError(() => {
      this.clear();
      return of(null);
    })
  );
}


  clear() {
    this.userSubject.next(null);
    localStorage.removeItem('token');
  }

}

   //   setUser(user: any) {
    //    this.userSubject.next(user);
    //  }

   //   getUser() {
   //     return this.userSubject.value;
   ///   }

   //   clear() {
   //     this.userSubject.next(null);
   //   }

