import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-calenadar',
  standalone: true,
  imports: [FormsModule, CalendarModule, TableComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarioComponent {

  @Input() categoria: string | undefined;

  

  date:string = '' ;

  dateSelected = '';

  showTable = false;

  constructor() {
    //this.date = []; // Inicializa con un array vacío
  }

  ngOnInit(): void {
    //this.date = this.obtenerFechaHoy();
    this.dateSelected = this.obtenerFechaHoy();
  }

  obtenerFechaHoy(): string {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const año = hoy.getFullYear();

    return `${dia}.${mes}.${año}`;
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
