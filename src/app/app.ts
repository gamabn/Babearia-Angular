import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStore } from './core/services/user-store';
import { isPlatformBrowser } from '@angular/common';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barbeiros');

   constructor(private userStore: UserStore) {}

  ngOnInit() {
    this.userStore.loadUser().subscribe();
  }


}
