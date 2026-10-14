import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Agendamentos {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  agendamentos(barbearia_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/agendamento/${barbearia_id}`);
  }
}
