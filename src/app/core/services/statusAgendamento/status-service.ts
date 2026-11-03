import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  status(id: string, status: string, barbearia_id: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/editagend/${id}`, {
      status,
      barbearia_id,
    });
  }
}
