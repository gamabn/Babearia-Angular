import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientsProps } from '../../../features/auth/models/cadastro-model';

@Injectable({
  providedIn: 'root',
})
export class Client {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  client(data: ClientsProps) {
    return this.http.post(`${this.baseUrl}/client`, data);
  }
}
