import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//PRIMENG
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
//SERVICIOS
import { EventService } from '../../../../core/services/modal.service';
import { SetinstalacionesService } from '../../../../core/services/set.instalaciones.services';
import { ReservasService } from '../../../../core/services/reservas.service';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-modal-jugadores',
  standalone: true,
  imports: [DialogModule, AvatarModule, CommonModule, ButtonModule],
  templateUrl: './modal-jugadores.component.html',
  styleUrl: './modal-jugadores.component.scss'
})
export class ModalJugadoresComponent implements OnInit{

  @Input() isVisible: boolean = false;
  @Input() reservaSeleccionada: any | undefined;
  @Output() close = new EventEmitter<void>();

  visible: boolean = true;
  instalaciones: any[] = [];

  horaPista = '';
  nombrePista = '';
  jugadorePista = 0 ;
  jugadores : any;
  userActive = '';
  userMail = '';
  visibleInscripcion = false;

  slots = Array(4).fill(null);

   /**
   * fijar las letras en el avatar
   */
   palabrasAvatar = '';

  constructor(
    private eventService : EventService,
    private setinstalacionesService: SetinstalacionesService,
    private router: Router,
    private reservasService: ReservasService
  ){

  }


  ngOnInit(): void {    
    this.horaPista = this.reservaSeleccionada.time;
    this.nombrePista = this.reservaSeleccionada.nombre;
    this.jugadores = this.reservaSeleccionada.usuarios_apuntados;
    if(this.jugadores){
      this.agregarIniciales(this.jugadores);
    }
    
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.userActive = parsedData.data?.id;  
      this.userMail = parsedData.data?.mail;    
    }
    
  }

  onCloseModal() {    
    //this.eventService.closeModal();
    this.visible = false;
    this.close.emit();
  }

   agregarIniciales(array: any) {
    array.forEach((item: { user: string; iniciales: any; }) => {
        let partesNombre = item.user.split(' ');
        let inicialNombre = partesNombre[0].charAt(0);
        let inicialApellido = partesNombre[1].charAt(0);
        item.iniciales = inicialNombre + inicialApellido;
    });
    
}

handleClick(){
  this.visibleInscripcion = true;  
  // this.visible = false;
}
reservar() {
  const reserva: any = {
    date: this.reservaSeleccionada.fecha,
    nombre: this.userActive,
    mail: this.userMail,
    tipo_reserva: this.reservaSeleccionada.tipo,
    numero_pista: this.reservaSeleccionada.nombre,
    hora: this.reservaSeleccionada.time,
    idPista: this.reservaSeleccionada.idPista,
  };

  this.reservasService.addReserva(reserva).pipe(
    catchError(error => {
      // Manejo del error, puedes mostrar un mensaje al usuario
      return of(null); // Retorna un observable vacío para continuar la cadena
    })
  ).subscribe((element) => {
    if (element) {
      this.visibleInscripcion = false;
      this.visible = true; 
      this.router.navigate(['mis-reservas']).then(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'auto'; // Restablecer el overflow
      });
    }
  });
}




reservarold(){
  const reserva: any = {
    date: this.reservaSeleccionada.fecha,
    nombre: this.userActive,
    mail: this.userMail,
    tipo_reserva : this.reservaSeleccionada.tipo,
    numero_pista : this.reservaSeleccionada.nombre,
    hora: this.reservaSeleccionada.time,
    idPista : this.reservaSeleccionada.idPista,
    //nombre: this.registrarReserva.get('nombre')?.value,
  };
  this.reservasService.addReserva(reserva).subscribe((element) => {
    console.log(element);
    this.router.navigate(['home']).then(() => {
      // Desplazarse a la parte superior de la página después de la navegación
      window.scrollTo(0, 0);
    });
    
    // if (element.status === 201) {
    //   console.log('ok');
    //   //this.showMessage = true;
    //   // this.messages = [
    //   //   // { severity: 'info', detail: 'Info Message' },
    //   //   { severity: 'success', detail: 'Reserva efectuada con exito' },
    //   // ];
    // }
    // if (element.status === 200) {
    //   console.log('ok');
      
    //   // this.showMessage = true;
    //   // this.messages = [
    //   //   // { severity: 'info', detail: 'Info Message' },
    //   //   { severity: 'info', detail: 'Has sido añadido a la reserva' },
    //   // ];
    // }
    //this.router.navigate(['home'])
    // setTimeout(() => {
     
    // }, 1000);
  });
  
}



}
