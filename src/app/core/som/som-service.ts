import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SomService {
  private audio = new Audio('/sounds/notificacao.mp3');
  private audioLiberado = false;

  constructor() {
    this.audio.preload = 'auto';
    this.audio.volume = 0.8;

    const destravar = () => this.destravar();
    ['click', 'touchstart', 'keydown', 'pointerdown'].forEach((ev) =>
      document.addEventListener(ev, destravar, { once: true }),
    );
  }

  // Primeira interação do usuário destrava o áudio
  // 👇 método público, chamado tanto pelo listener quanto pelo console
  destravar(): void {
    if (this.audioLiberado) return;

    console.log('🔊 Tentando destravar áudio:', this.audio.src);
    this.audioLiberado = true;

    this.audio.muted = true;
    this.audio
      .play()
      .then(() => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.muted = false;
        console.log('✅ Áudio destravado com sucesso');
      })
      .catch((err) => {
        console.warn('❌ Falha ao destravar áudio:', err);
        this.audioLiberado = false; // permite tentar de novo
      });
  }

  tocar(): void {
    if (!this.audioLiberado) {
      console.warn('Áudio ainda não destravado (usuário não interagiu)');
      return;
    }
    this.audio.currentTime = 0;
    this.audio.play().catch((err) => {
      console.warn('Não foi possível tocar o som:', err);
    });
  }
}
