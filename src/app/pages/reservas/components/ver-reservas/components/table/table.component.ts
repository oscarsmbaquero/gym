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
import { EventService } from '../../../../../../core/services/modal.service';
import { SetinstalacionesService } from '../../../../../../core/services/set.instalaciones.services';
//primeng
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
//COMPONENTES
import { ModalJugadoresComponent } from '../../../modal-jugadores/modal-jugadores.component';


interface Intervalo {
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, TooltipModule, ModalJugadoresComponent],
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
  plazasLibres = 0;
  showModal = false;
  reservaSeleccionada : any;




  constructor(
    private reservasService: ReservasService,
    private instalacionesService :InstalacionesService,
    private eventService: EventService,
    private setinstalacionesService: SetinstalacionesService
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
    }, 3000);
    
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
    this.reservaSeleccionada = element;
    
  }
  /**
   * 
   */
  checkReservations(): void {
    if (this.instalaciones.length) {
      console.log('Instalaciones antes de actualizar:', this.instalaciones);
      console.log('Reservas por fecha:', this.reservasByDate);
      
      // Añadir el campo "usuarios_restantes" a cada reserva
      this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number }) => {
        reserva.usuarios_restantes = reserva.n_usuario - reserva.usuarios_apuntados;
      });
      //Añadir usuario a cada reserva//TODO-TIPAR USUARIO
      this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number, usuario: any }) => {
        reserva.usuario;
      });
      //Añadir el array de usuarios
      this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number, usuario: any }) => {
        reserva.usuario;
      });
      this.instalaciones.forEach(instalacion => {
        instalacion.horas = instalacion.horas.map((hora: string) => {
          // Encontrar la reserva correspondiente para la instalación y la hora
          const reserva = this.reservasByDate.find((reserva: { instalacion: { _id: any; }; horaInicio: string; horaFin: string; }) =>
            reserva.instalacion._id === instalacion._id &&
            reserva.horaInicio + '-' + reserva.horaFin === hora
          );
  
          // Verificar si la hora está reservada
          const isReserved = reserva && reserva.n_usuario === reserva.usuarios_apuntados;
          const isReservedPartial = reserva && reserva.usuarios_apuntados > 0 && reserva.n_usuario !== reserva.usuarios_apuntados;
          const plazasLibres = reserva ? reserva.usuarios_restantes : 4;
          const usuariosReservado = reserva ? reserva.usuario : ''
          //Seteamos los usuarios para pintarlos en la modal
          // this.setinstalacionesService.setUsuariosReserva(usuariosReservado)
          // Crear un objeto con el string de la hora y el booleano reserved, incluyendo usuarios_restantes si existe
          return {
            time: hora,
            reserved: !!isReserved,
            reservedPartial: !!isReservedPartial,
            usuarios_restantes: plazasLibres,
            usuarios_apuntados: usuariosReservado,
          };
        });
      });
      // console.log(this.reservaSeleccionada);
      
      // this.reservaSeleccionada = [...this.instalaciones]
      // console.log(this.reservaSeleccionada,201);
      
      //this.setinstalacionesService.setUsuariosReserva(this.instalaciones)
      this.isLoading = false;
      console.log('Instalaciones después de actualizar:', this.instalaciones);
    }
  }
  

  getTooltipText(hora: any): string {    
    if (hora.reserved) {
      return 'Esta hora está completamente reservada';
    } else if (hora.reservedPartial) {
      return `Plazas disponibles:${hora.usuarios_restantes}`;
    } else {
      return 'Hacer clic para reservar';
    }
  }

  openModal(){
    this.showModal = true;
    //this.eventService.openModal();
  }
  closeModal() {
    console.log('Entro');
    
    this.showModal = false;
    console.log(this.showModal);
    
  }
}
  
  

