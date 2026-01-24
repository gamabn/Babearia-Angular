import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroModel } from '../../features/auth/models/cadastro-model';

@Injectable({
  providedIn: 'root'
})
export class Detail {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  detail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${id}`)
}
}
