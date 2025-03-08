import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ❌ Eliminar BrowserModule


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HttpClientModule, FormsModule], // ❌ Eliminar BrowserModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pos-abarrotes';
}
