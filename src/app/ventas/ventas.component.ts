import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-ventas',
    imports: [CommonModule, RouterModule, HttpClientModule],
    templateUrl: './ventas.component.html',
    styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
    ventas: any[] = []; // Array para almacenar las ventas

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.obtenerVentas();
    }

    // Obtener las ventas desde el backend
    obtenerVentas() {
        this.http.get<any[]>('http://localhost:3000/api/ventas')
            .subscribe(
                (data) => {
                    console.log('Datos de ventas:', data); // Verificar la estructura de los datos
                    this.ventas = data;
                },
                (error) => {
                    console.error('Error al obtener las ventas:', error);
                }
            );
    }
}