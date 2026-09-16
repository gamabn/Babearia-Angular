import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CriarServiceBarber {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  createServiceId(data: any) {
    console.log('Dados do Serviço', data);
    // return this.http.get(`${this.baseUrl}/service`, data);
  }
}
