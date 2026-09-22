import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agua',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agua.html',
  styleUrl: './agua.css'
})
export class AguaComponent {

  metaVasos = 8;

  vasos = [
    { numero: 1, tomado: true },
    { numero: 2, tomado: true },
    { numero: 3, tomado: true },
    { numero: 4, tomado: true },
    { numero: 5, tomado: false },
    { numero: 6, tomado: false },
    { numero: 7, tomado: false },
    { numero: 8, tomado: false }
  ];

  cantidadPorVaso = 250;

  nota = '';

  estados = [
    { emoji: '😊', nombre: 'Feliz' },
    { emoji: '😌', nombre: 'Tranquila' },
    { emoji: '😐', nombre: 'Neutral' },
    { emoji: '😔', nombre: 'Triste' },
    { emoji: '😣', nombre: 'Cansada' }
  ];

  estadoSeleccionado = 'Feliz';

  // Datos de ejemplo para la gráfica.
  // Después los reemplazaremos con datos de MySQL.
  consumoMensual = [
    { dia: 1, litros: 1.5 },
    { dia: 2, litros: 1.8 },
    { dia: 3, litros: 2.0 },
    { dia: 4, litros: 1.2 },
    { dia: 5, litros: 1.7 },
    { dia: 6, litros: 2.1 },
    { dia: 7, litros: 1.6 },
    { dia: 8, litros: 1.9 },
    { dia: 9, litros: 1.4 },
    { dia: 10, litros: 2.0 },
    { dia: 11, litros: 1.8 },
    { dia: 12, litros: 1.5 },
    { dia: 13, litros: 2.2 },
    { dia: 14, litros: 1.7 },
    { dia: 15, litros: 1.9 }
  ];

  get vasosTomados(): number {
    return this.vasos.filter(vaso => vaso.tomado).length;
  }

  get totalMl(): number {
    return this.vasosTomados * this.cantidadPorVaso;
  }

  get totalLitros(): number {
    return this.totalMl / 1000;
  }

  get porcentajeMeta(): number {
    return Math.min(
      Math.round((this.vasosTomados / this.metaVasos) * 100),
      100
    );
  }

  alternarVaso(numero: number): void {
    const vaso = this.vasos.find(v => v.numero === numero);

    if (vaso) {
      vaso.tomado = !vaso.tomado;
    }
  }

  seleccionarEstado(nombre: string): void {
    this.estadoSeleccionado = nombre;
  }

  guardarRegistro(): void {
    console.log({
      vasos: this.vasosTomados,
      cantidadMl: this.totalMl,
      estado: this.estadoSeleccionado,
      nota: this.nota
    });

    alert('Registro de agua guardado correctamente');
  }
}