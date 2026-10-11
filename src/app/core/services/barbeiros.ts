import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BarbeiroAll {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  barbeiros(): Observable<any> {
    return this.http.get(`${this.baseUrl}/barberall`);
  }

  barbeirosId(barbearia_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/barber/many/${barbearia_id}`);
  }
}
