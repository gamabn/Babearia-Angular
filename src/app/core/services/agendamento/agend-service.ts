import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgendService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  agendar({ dados }: any): Observable<any> {
    console.log('Dados do agendamento', dados);
    return this.http.post(`${this.baseUrl}/agend`, {
      client_id: dados.cliente,
      barber_id: dados.barbeiro_id,
      date_agend: dados.agend,
      // service_ids: dados.service.map((item: any) => item.id),
      service_id: [dados.service],
      tipo: 'AGENDAMENTO',
    });
  }
}
