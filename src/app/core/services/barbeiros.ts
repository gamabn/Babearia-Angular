import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BarbeiroAll {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  barbeiros(): Observable<any> {
    return this.http.get(`${this.baseUrl}/barberall`)
  }
}
