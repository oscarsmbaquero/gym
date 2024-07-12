import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
import { LoaderComponent } from '../../../../../../shared/components/loader/loader.component';

interface Intervalo {
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, TooltipModule, ModalJugadoresComponent, LoaderComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
//[x: string]: any;
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
  previousDataSelected: any;
  fechaSeleccionada:any;



  constructor(
    private reservasService: ReservasService,
    private instalacionesService :InstalacionesService,
    private eventService: EventService,
    private setinstalacionesService: SetinstalacionesService,
    private router: Router
  ) {

    
  }

  ngOnInit(): void {
    //this.getInstalaciones();   
    // window.scroll(0, 0);
  }

  ngOnChanges(changes: SimpleChanges) {  
    const change = changes['dataSelected'];
    const changeCategoria = changes['categoria'];  
    // Si hay cambios en dataSelected, actualiza previousDataSelected
    if (change) {
      this.previousDataSelected = change.currentValue;
    }  
    // Si hay cambios en dataSelected o en categoria, procede
    if (change || changeCategoria) {
      this.isLoading = true;  
      // Usa el valor anterior de dataSelected si change no tiene cambios
      const dataSelectedValue = change ? change.currentValue : this.previousDataSelected;  
      this.dataSelected = `${dataSelectedValue}`;
      this.fechaSeleccionada = this.dataSelected;
      console.log(this.fechaSeleccionada);
      
      this.obtenerReservasByDate(this.dataSelected);
      this.getInstalaciones();
    }
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
        console.log(this.reservasByDate, 'reservas');
           
      },
      (error: any) => {
        console.error('Error al obtener los datos', error);
        //this.isLoading = false;
      }
    );   
  }

  /**
   * 
   * @param element 
   * @param nombre 
   */
  reservar(element: any, nombre: string, pista: any){
    this.reservaSeleccionada = {...element,nombre };    
  }
  /**
   * 
   */
  // checkReservations(): void {
  //   if ( this.instalaciones && this.instalaciones.length && this.reservasByDate) {      
  //     // Añadir el campo "usuarios_restantes" a cada reserva
  //     this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number }) => {
  //       reserva.usuarios_restantes = reserva.n_usuario - reserva.usuarios_apuntados;
  //     });
  //     //Añadir usuario a cada reserva//TODO-TIPAR USUARIO
  //     // this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number, usuario: any }) => {
  //     //   reserva.usuario;
  //     // });
  //     //Añadir el array de usuarios
  //     this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number, usuario: any }) => {
  //       reserva.usuario;
  //     });
  //     this.instalaciones.forEach(instalacion => {
  //       instalacion.horas = instalacion.horas.map((hora: string) => {
  //         // Encontrar la reserva correspondiente para la instalación y la hora
  //         const reserva = this.reservasByDate.find((reserva: { instalacion: { _id: any; }; horaInicio: string; horaFin: string; }) =>
  //           reserva.instalacion._id === instalacion._id &&
  //           reserva.horaInicio + '-' + reserva.horaFin === hora
  //         );                               
  //         // Verificar si la hora está reservada
  //         const isReserved = reserva && reserva.n_usuario === reserva.usuarios_apuntados;
  //         const isReservedPartial = reserva && reserva.usuarios_apuntados > 0 && reserva.n_usuario !== reserva.usuarios_apuntados;
  //         const plazasLibres = reserva ? reserva.usuarios_restantes : 4;
  //         const usuariosReservado = reserva ? reserva.usuario : '';
  //         const fechaReserva = reserva ? reserva.fecha : '';
  //         const tipoPista = reserva ? reserva.instalacion.tipo : '';
  //         const idPista = reserva ? reserva.instalacion._id : '';          
  //         const omitirHorasAnteriores = this.obtenerHora(fechaReserva)
  //         //Seteamos los usuarios para pintarlos en la modal
  //         // this.setinstalacionesService.setUsuariosReserva(usuariosReservado)
  //         // Crear un objeto con el string de la hora y el booleano reserved, incluyendo usuarios_restantes si existe
  //         return {
  //           time: hora,
  //           reserved: !!isReserved,
  //           reservedPartial: !!isReservedPartial,
  //           usuarios_restantes: plazasLibres,
  //           usuarios_apuntados: usuariosReservado,
  //           fecha : fechaReserva,
  //           tipo : tipoPista,
  //           idPista : idPista,
  //           horaAnterior: omitirHorasAnteriores,
  //         };
  //       });
  //     });
  //   }
  //   console.log(this.instalaciones,'188');
    
  //   this.isLoading = false;
  // }
  checkReservations(): void {
    console.log('cjeck');
    
    const today = new Date();
    const formattedToday = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear().toString()}`;
    console.log(formattedToday);
    
    if (this.instalaciones && this.instalaciones.length && this.reservasByDate) {
        // Añadir el campo "usuarios_restantes" a cada reserva
        this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number }) => {
            reserva.usuarios_restantes = reserva.n_usuario - reserva.usuarios_apuntados;
        });

        // Añadir el array de usuarios
        this.reservasByDate.forEach((reserva: { n_usuario: number; usuarios_apuntados: number; usuarios_restantes?: number, usuario: any }) => {
            reserva.usuario;
        });

        this.instalaciones.forEach(instalacion => {
            instalacion.horas = instalacion.horas.map((hora: string) => {
                // Obtener la hora actual
                const currentHours = today.getHours();
                const currentMinutes = today.getMinutes();

                // Dividir la hora de la instalación en hora de inicio y fin
                const [horaInicio, horaFin] = hora.split('-');
                const [horaInicioHoras, horaInicioMinutos] = horaInicio.split(':').map(Number);
                const [horaFinHoras, horaFinMinutos] = horaFin.split(':').map(Number);
                //comparo la fecha de hoy con la seleccionada
                const isToday = this.fechaSeleccionada === formattedToday;
                // Comparar la hora de inicio con la hora actual y la fecha de hoy
                const isHoraAnterior = isToday && horaInicioHoras < currentHours || (horaInicioHoras === currentHours && horaInicioMinutos < currentMinutes);
                // Encontrar la reserva correspondiente para la instalación y la hora
                const reserva = this.reservasByDate.find((reserva: { instalacion: { _id: any; }; horaInicio: string; horaFin: string; }) =>
                    reserva.instalacion._id === instalacion._id &&
                    reserva.horaInicio + '-' + reserva.horaFin === hora
                );

                // Verificar si la hora está reservada
                const isReserved = reserva && reserva.n_usuario === reserva.usuarios_apuntados;
                const isReservedPartial = reserva && reserva.usuarios_apuntados > 0 && reserva.n_usuario !== reserva.usuarios_apuntados;
                const plazasLibres = reserva ? reserva.usuarios_restantes : 4;
                const usuariosReservado = reserva ? reserva.usuario : '';
                const fechaReserva = reserva ? reserva.fecha : '';
                const tipoPista = reserva ? reserva.instalacion.tipo : '';
                const idPista = reserva ? reserva.instalacion._id : '';

                // Crear un objeto con el string de la hora y el booleano reserved, incluyendo usuarios_restantes si existe
                return {
                    time: hora,
                    reserved: !!isReserved,
                    reservedPartial: !!isReservedPartial,
                    usuarios_restantes: plazasLibres,
                    usuarios_apuntados: usuariosReservado,
                    fecha: fechaReserva,
                    tipo: tipoPista,
                    idPista: idPista,
                    horaAnterior: isHoraAnterior,
                };
            });
        });
    }
    console.log(this.instalaciones, '188');
    this.isLoading = false;
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

  // Función para extraer la hora (los dos primeros dígitos) de una cadena en formato "HH:MM"
 obtenerHora(horaCompleta: string): string {
  return horaCompleta.split(':')[0];
}

  openModal(){
    this.showModal = true;
    //this.eventService.openModal();
  }
  closeModal() {    
    this.showModal = false;
    
  }

  //TODO CAMBIAR FUNCION PARA RECIBIR PISTA Y NO TANTOS ATRIBUTOS
  handleClick(hora: any, nombre: string, pista: any,fecha:any): void {
    console.log(hora);
    console.log(nombre);
    console.log(pista);
    console.log(fecha);
    console.log(this.dataSelected,'dataSelected');
    this.fechaSeleccionada = fecha;
    
    
    const reservaHoraDia ={
      hora: hora,
      nombre: nombre,
      pista: pista,
      fecha: this.dataSelected
    }
    
    
    
    if (hora?.reservedPartial) {
      this.openModal();
      this.reservar(hora, nombre, pista);
    }else{
      this.reservasService.setReservaForm(reservaHoraDia);
      this.router.navigate(['reservar']);
    }
  }
}
  
  

