import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../../../core/services/reservas.service';
import { CommonModule } from '@angular/common';
//PRIMENG
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [TableModule, CommonModule, BadgeModule],
  templateUrl: './mis.reservas.component.html',
  styleUrl: './mis.reservas.component.scss',
})
export class MisReservasComponent implements OnInit {
  id = '';
  //TODO TIPAR
  misReservas: any[] = [];

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
        //se comentan las vencidas
        // reserva['vencida'] = fechaReserva < hoy;
        return reserva;
      });
    });    
  }
}
