import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeletModal {
  private baseUrl = 'http://localhost:3333';

  constructor(private url: HttpClient) {}

  removeServiceId(id: string): Observable<any> {
    return this.url.delete(`${this.baseUrl}/deleteservice/${id}`);
  }
}
