import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GetAgendamentoProps } from '../../../features/auth/models/cadastro-model';
@Injectable({
  providedIn: 'root',
})
export class GetAgend {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  consutarAgend(barbearia_id: string | undefined): Observable<GetAgendamentoProps[]> {
    return this.http.get<GetAgendamentoProps[]>(`${this.baseUrl}/agendamento/${barbearia_id}`);
  }
}
