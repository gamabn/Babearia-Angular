import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SomService {
  private platformId = inject(PLATFORM_ID);
  private audio: HTMLAudioElement | null = null;
  private audioLiberado = false;

  constructor() {
    // Só executa no navegador — no servidor (SSR/prerender) não há Audio nem document
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.audio = new Audio('/sounds/notificacao.mp3');
    this.audio.preload = 'auto';
    this.audio.volume = 0.8;

    const destravar = () => this.destravar();
    ['click', 'touchstart', 'keydown', 'pointerdown'].forEach((ev) =>
      document.addEventListener(ev, destravar, { once: true }),
    );
  }

  destravar(): void {
    if (!this.audio || this.audioLiberado) return;

    console.log('🔊 Tentando destravar áudio:', this.audio.src);
    this.audioLiberado = true;

    this.audio.muted = true;
    this.audio
      .play()
      .then(() => {
        this.audio!.pause();
        this.audio!.currentTime = 0;
        this.audio!.muted = false;
        console.log('✅ Áudio destravado com sucesso');
      })
      .catch((err) => {
        console.warn('❌ Falha ao destravar áudio:', err);
        this.audioLiberado = false;
      });
  }

  tocar(): void {
    if (!this.audio) return; // estamos no servidor, não faz nada
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
