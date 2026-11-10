import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ServiceToken } from './token/service-token';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:3333';

  constructor(
    private http: HttpClient,
    private serviceToken: ServiceToken,
  ) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((data: any) => {
        console.log('🔑 LOGIN: token recebido', data.token);
        // ✅ seta o token quando a resposta chegar
        this.serviceToken.setToken(data.token);
        console.log('🔑 LOGIN: token salvo?', this.serviceToken.getToken());
      }),
    );
  }
}
