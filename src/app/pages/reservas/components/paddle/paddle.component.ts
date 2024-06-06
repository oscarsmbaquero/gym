import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-paddle',
  standalone: true,
  imports: [FormsModule, CalendarModule],
  templateUrl: './paddle.component.html',
  styleUrl: './paddle.component.scss'
})
export class PaddleComponent {

  date: Date[] | undefined;

  constructor() {
    this.date = []; // Inicializa con un array vacío
  }

  onDateChange(event: Date | Date[]) {
    if (Array.isArray(event)) {
      this.date = event;
    } else {
      this.date = [event];
    }
    console.log('Fechas seleccionadas:', this.date);
    // Aquí puedes agregar cualquier lógica adicional que necesites cuando cambien las fechas
  }

}
