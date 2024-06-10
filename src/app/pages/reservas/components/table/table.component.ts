import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICIOS
import { ReservasService } from '../../../../core/services/reservas.service';
import { InstalacionesService } from '../../../../core/services/instalaciones-services';
//primeng
import { TableModule } from 'primeng/table';

interface Intervalo {
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
[x: string]: any;
  @Input() dataSelected: string | undefined;
  @Input() categoria: string | undefined;

  horasIndices: number[] | undefined;

  /**
   * flag para actualizar la tabla
   */
  showReservas = false;

  reservasByDate:any;

  isLoading = true;
  hasData = false;

  //pistas: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4'];
  startTime: string = '09:30';
  interval: number = 1.5; // horas
  //reservationSlots: string[] = this.generateReservationSlots(this.startTime, this.interval, 10); // 10 slots para 10 intervalos de 1.5h desde las 09:30
  intervalos: Intervalo[] = [];
  instalaciones!: any[];




  constructor(
    private reservasService: ReservasService,
    private instalacionesService :InstalacionesService
  ) {

    
  }

  ngOnInit(): void {
    console.log(this.dataSelected, 'init');
    this.getInstalaciones();
    //this.getReservas();
    //this.reservationSlots = this.generateReservationSlots(this.startTime, this.interval, 10); // 10 slots para 10 intervalos de 1.5h desde las 09:30
    //this.intervalos = this.generateReservationSlots(this.startTime, this.interval, 10); // 10 slots para 10 intervalos de 1.5h desde las 09:30
    //this.intervalos = this.generateIntervalos();
    //console.log(this.reservationSlots);
    
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['dataSelected'];
    const changeCategoria = changes['categoria'];

    if (change) {
      //this.showChanges = true;
      console.log(`New value: ${change.currentValue}`);
      this.dataSelected = `${change.currentValue}`;
      console.log(this.dataSelected);
      this.obtenerReservasByDate(this.dataSelected);
      this.getInstalaciones();
    }
    if(changeCategoria){
      //this.obtenerReservasByDate(this.dataSelected);
      this.getInstalaciones();
    }
  }

  getInstalaciones(){
    this.instalacionesService.getInstalaciones().subscribe((element) =>{
      this.instalaciones = element.filter(instalacion => instalacion.tipo === this.categoria);
      console.log(this.instalaciones);
    })
  }
  

  obtenerReservasByDate(date: string) {
    console.log(date);
    this.reservasService.getReservasByDate(date).subscribe(
      (response: any) => {
        this.reservasByDate = response;
        this.hasData = this.reservasByDate && this.reservasByDate.length > 0;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al obtener los datos', error);
        this.isLoading = false;
      }
    );
        
  }

  products = [
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
  ];

  getReservas() {
    this.reservasService.getReservas().subscribe((element) => {
      console.log(element);
    });
    
  }

  // generateReservationSlots(start: string, interval: number, count: number): Intervalo[] {
  //   const slots: Intervalo[] = [];
  //   let currentTime = new Date(`1970-01-01T${start}:00`);

  //   for (let i = 0; i < count; i++) {
  //     const startHour = currentTime.getHours().toString().padStart(2, '0');
  //     const startMinutes = currentTime.getMinutes().toString().padStart(2, '0');
  //     const horaInicio = `${startHour}:${startMinutes}`;

  //     currentTime.setMinutes(currentTime.getMinutes() + interval * 60);

  //     const endHour = currentTime.getHours().toString().padStart(2, '0');
  //     const endMinutes = currentTime.getMinutes().toString().padStart(2, '0');
  //     const horaFin = `${endHour}:${endMinutes}`;

  //     slots.push({ horaInicio, horaFin });
  //   }

  //   return slots;
  // }

  // generateIntervalos(): Intervalo[] {
  //   const intervalos: Intervalo[] = [];
  //   let horaInicio = 9;
  //   let minutoInicio = 30;
  //   const duracionIntervalo = 90; // Duración del intervalo en minutos

  //   while (horaInicio < 22 || (horaInicio === 22 && minutoInicio === 0)) {
  //     const horaFin = (minutoInicio + duracionIntervalo) % 60 === 0 ? horaInicio + Math.floor((minutoInicio + duracionIntervalo) / 60) : horaInicio;
  //     const minutoFin = (minutoInicio + duracionIntervalo) % 60;
  //     intervalos.push({
  //       horaInicio: `${horaInicio.toString().padStart(2, '0')}:${minutoInicio.toString().padStart(2, '0')}`,
  //       horaFin: `${horaFin.toString().padStart(2, '0')}:${minutoFin.toString().padStart(2, '0')}`
  //     });
  //     horaInicio = horaFin + Math.floor((minutoInicio + duracionIntervalo) / 60);
  //     minutoInicio = (minutoInicio + duracionIntervalo) % 60;
  //   }

  //   return intervalos;
  // }

  onCellClick( intervalo: any) {
    console.log(`Clicked on ${0} at ${intervalo.horaInicio} - ${intervalo.horaFin}`);
    // Aquí puedes manejar la lógica para reservar una pista
  }
  reservar(element: any, nombre: string){
    console.log('Entro', element, nombre);
    
  }
  
  
}
