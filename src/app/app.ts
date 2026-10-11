import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStore } from './core/services/user-store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('barbeiros');
  private userStore = inject(UserStore);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userStore.loadUser().subscribe();
    }
  }
}
