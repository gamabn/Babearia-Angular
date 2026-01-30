import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../components/header/header';


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header],
  standalone: true,
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
