import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeleteAgend {
  constructor(private http: HttpClient) {}

  deleteAgendamento(id: string, barber_id: string | undefined): Observable<any> {
    const url = `${environment.apiUrl}/agend/${id}?barber_id=${barber_id}`;
    return this.http.delete(url);
  }
}
