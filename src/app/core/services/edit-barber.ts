import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditBarber {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  edit(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/${id}`, data)
  }

}
