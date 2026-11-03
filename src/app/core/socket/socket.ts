import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // A instância do socket fica privada, encapsulada
  private socket: Socket;

  constructor() {
    // Conecta ao servidor Socket.IO (ajuste a URL conforme seu backend)
    this.socket = io('http://localhost:3333', {
      // Opções úteis:
      transports: ['websocket'], // força WebSocket direto (sem polling)
      // auth: { token: '...' },    // se precisar autenticar
    });
  }

  /**
   * Escuta um evento do servidor e devolve um Observable.
   * Assim você pode usar `.subscribe()` no componente.
   */
  onEvent<T>(eventName: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.socket.on(eventName, (data: T) => {
        subscriber.next(data);
      });

      //==========================================
      this.socket.on('connect', () => console.log('Socket conectado! ID:', this.socket.id));
      this.socket.on('connect_error', (err) => console.error('Erro de conexão:', err));

      // Cleanup: remove o listener quando o Observable é cancelado
      return () => {
        this.socket.off(eventName);
      };
    });
  }

  /**
   * Emite um evento para o servidor.
   */
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  /**
   * (Opcional) Desconectar manualmente, se precisar.
   */
  disconnect(): void {
    this.socket.disconnect();
  }
}
