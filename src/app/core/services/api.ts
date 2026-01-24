import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Api {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {
  }   // GET - buscar lista de posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`)
  }
postLogin({email, password}: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/login`, { params: { email, password }} )
  }


  // GET - buscar um post por id
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts/${id}`);
  }

  // POST - criar novo post
  createPost(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, data)
  }

  // PUT - atualizar post
  updatePost(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/posts/${id}`, data);
  }

  // DELETE - excluir post
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/posts/${id}`);

   }
}
