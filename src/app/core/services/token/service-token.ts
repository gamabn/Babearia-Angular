import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceToken {
  private token: string | null = null;
  // private readonly id = Math.random().toString(36).slice(2, 8);

  constructor() {
    console.log('🏗️ ServiceToken criado:', this.token);
  }

  setToken(token: string) {
    console.log(`💾  setToken`);
    this.token = token;
  }
  getToken(): string | null {
    console.log(`📤 ] getToken:`, this.token);
    return this.token;
  }

  clearToken() {
    console.log(`🧹  clearToken`);
    console.trace();
    this.token = null;
  }
}
