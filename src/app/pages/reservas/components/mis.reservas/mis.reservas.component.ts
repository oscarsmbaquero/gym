import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../../../core/services/reservas.service';
import { CommonModule } from '@angular/common';
//PRIMENG
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
//COMPONENTES
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [TableModule, CommonModule, BadgeModule, LoaderComponent],
  templateUrl: './mis.reservas.component.html',
  styleUrl: './mis.reservas.component.scss',
})
export class MisReservasComponent implements OnInit {
  id = '';
  //TODO TIPAR
  misReservas: any[] = [];
  showTable = false;

  constructor(private reservasService: ReservasService) {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : {};
    this.id = user.data.id;
  }

  ngOnInit(): void {
    this.getMisReservas();
  }

  getMisReservas() {
    this.reservasService.getMisReservas(this.id).subscribe((element) => {        
      const hoy = new Date();
      const dosDiasDespues = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 2);
      
      this.misReservas = element.map((reserva) => {
        // Convertir la fecha del formato "dd.MM.yyyy" a un objeto Date
        const [dia, mes, anio] = reserva.fecha.split('.').map(Number);
        const fechaReserva = new Date(anio, mes - 1, dia);
        reserva['proxima'] = fechaReserva < dosDiasDespues;
        reserva['hora'] = `${reserva.horaInicio} - ${reserva.horaFin}`;
        reserva['esHoy'] = fechaReserva.toDateString() === hoy.toDateString();
          this.showTable = true;
        // reserva['vencida'] = fechaReserva < hoy;
        return reserva;
      });
     // Ordenar el array por el campo 'fecha'
     this.misReservas.sort((a, b) => {
      // Primero, comparar las fechas
      let fechaA = this.reestructurarFecha(a.fecha);
      let fechaB = this.reestructurarFecha(b.fecha);
      let comparacionFecha = fechaA.localeCompare(fechaB);  
      // Si las fechas son iguales, comparar las horas
      if (comparacionFecha === 0) {
          return this.compararHoras(a.horaInicio, b.horaInicio);
      }
      return comparacionFecha; // Para orden ascendente
      // return comparacionFecha * -1; // Para orden descendente
  });
      console.log(this.misReservas);
    });    
  }

  // Función para reestructurar la fecha de "DD.MM.YYYY" a "YYYYMMDD" para comparación
 reestructurarFecha(fechaStr: string) {
  let [dia, mes, año] = fechaStr.split('.');
  return `${año}${mes}${dia}`;
}

compararHoras(horaA: string, horaB: string) {
  let [horaA_H, horaA_M] = horaA.split(':').map(Number);
  let [horaB_H, horaB_M] = horaB.split(':').map(Number);
  return horaA_H - horaB_H || horaA_M - horaB_M;
}
}
