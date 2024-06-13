import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICIOS
import { ReservasService } from '../../../../../../core/services/reservas.service';
import { InstalacionesService } from '../../../../../../core/services/instalaciones-services';
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
    //this.getInstalaciones();   
    // window.scroll(0, 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['dataSelected'];
    const changeCategoria = changes['categoria'];

    if (change || changeCategoria) {
      this.isLoading = true;
      console.log(`New value: ${change.currentValue}`);
      this.dataSelected = `${change.currentValue}`;
      console.log(this.dataSelected);
      this.obtenerReservasByDate(this.dataSelected);
      this.getInstalaciones();
      // this.checkReservations(); 
      //this.getInstalaciones();
    }
    // if(changeCategoria){
    //   //this.obtenerReservasByDate(this.dataSelected);
    //   this.getInstalaciones();
    //   setTimeout(() => {
    //     this.checkReservations();   
    //   }, 5000);
      
    // }
  }

  /**
   * Funcion para obtener las instalaciones de pistas de tennis y paddle
   */
  getInstalaciones(){    
    this.instalacionesService.getInstalaciones().subscribe((element) =>{
      this.instalaciones = element.filter(instalacion => instalacion.tipo === this.categoria);
    });
    setTimeout(() => {
      this.checkReservations();   
    }, 2000);
    
  }
  
  /**
   * Obtiene las reservas por fecha
   * @param date 
   */
  obtenerReservasByDate(date: string) {
    this.reservasService.getReservasByDate(date).subscribe(
      (response: any) => {
        this.reservasByDate = response;
        //this.hasData = this.reservasByDate && this.reservasByDate.length > 0;
        //this.isLoading = false;
        console.log(this.reservasByDate,'reservasByDate');
        
      },
      (error: any) => {
        console.error('Error al obtener los datos', error);
        //this.isLoading = false;
      }
    );   
  }

  /**
   * Obtiene las reservas//TODO COMENTAR
   */
  // getReservas() {
  //   this.reservasService.getReservas().subscribe((element) => {
  //     console.log(element);
  //   });    
  // }


  /**
   * 
   * @param element 
   * @param nombre 
   */
  reservar(element: any, nombre: string){
    console.log('Entro', element, nombre);
    
  }

  // checkReservations(): void {      
  //   if(this.instalaciones.length && this.reservasByDate.length){
  //     console.log(this.instalaciones);
  //     console.log(this.reservasByDate);
  //     this.instalaciones.forEach(instalacion => {
  //       instalacion.horas = instalacion.horas.map((hora: string) => {
  //         const isReserved = this.reservasByDate.some((reserva: { instalacion: { _id: any; }; horaInicio: string; horaFin: string; n_usuario: any; usuarios_apuntados: any; }) =>
  //           reserva.instalacion._id === instalacion._id &&
  //           reserva.horaInicio + '-' + reserva.horaFin === hora &&
  //           reserva.n_usuario === reserva.usuarios_apuntados
  //         );
  //         console.log(this.instalaciones,'instalaciones');
  //         return {
  //           time: hora,
  //           reserved: isReserved
  //         };
        
          
  //       });
  //     });

  //   }
   
  // }
  checkReservations(): void {
    if (this.instalaciones.length) {
      console.log('Instalaciones antes de actualizar:', this.instalaciones);
      console.log('Reservas por fecha:', this.reservasByDate);
    
      this.instalaciones.forEach(instalacion => {
        instalacion.horas = instalacion.horas.map((hora: string) => {
          // Verificar si la hora está reservada
          const isReserved = this.reservasByDate.some((reserva: { instalacion: { _id: any; }; horaInicio: string; horaFin: string; n_usuario: any; usuarios_apuntados: any; }) =>
            reserva.instalacion._id === instalacion._id &&
            reserva.horaInicio + '-' + reserva.horaFin === hora &&
            reserva.n_usuario === reserva.usuarios_apuntados
          );
  
          // Crear un objeto con el string de la hora y el booleano reserved
          return {
            time: hora,
            reserved: isReserved
          };
        });
      });
      this.isLoading = false;
      console.log('Instalaciones después de actualizar:', this.instalaciones);
    }
  }
  
}
  
  

