import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-paddle',
  standalone: true,
  imports: [FormsModule, CalendarModule, TableComponent],
  templateUrl: './paddle.component.html',
  styleUrl: './paddle.component.scss'
})
export class PaddleComponent {

  @Input() categoria: string | undefined;

  date: Date[] | undefined;

  dateSelected = '';

  showTable = false;

  constructor() {
    this.date = []; // Inicializa con un array vacío
  }

  /**
   * Funcion que recibe la fecha del calendario y la convierte en string
   * @param event 
   */
  onDateChange(event: Date | Date[]) {
    let fechaFormateada: string;

    if (Array.isArray(event) && event.length > 0) {
        fechaFormateada = this.formatearFecha(event[0]);
    } else if (!Array.isArray(event)) {
        fechaFormateada = this.formatearFecha(event);
    } else {
        fechaFormateada = '';
    }
    this.dateSelected = fechaFormateada;
    this.showTable = true;
}

/**
 * formatea la fecha en el formato correcto
 * @param fecha 
 * @returns 
 */
formatearFecha(fecha: Date): string {
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const año = fecha.getFullYear();

    return `${dia}.${mes}.${año}`;
}



}
