import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarberService {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient){}

  handleService(id:string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/service/${id}`);
  }
  
}
