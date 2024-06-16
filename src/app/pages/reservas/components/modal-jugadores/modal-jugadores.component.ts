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
  jugadorePista = 0 ;
  jugadores : any;

  userActive = '';
  visibleInscripcion = false;

  slots = Array(4).fill(null);

   /**
   * fijar las letras en el avatar
   */
   palabrasAvatar = '';

  constructor(
    private eventService : EventService,
    private setinstalacionesService: SetinstalacionesService,
    private router: Router
  ){

  }


  ngOnInit(): void {
    this.horaPista = this.reservaSeleccionada.time;
    this.jugadores = this.reservaSeleccionada.usuarios_apuntados;
    this.agregarIniciales(this.jugadores);
    const storedData = localStorage.getItem('user');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.userActive = parsedData.data?.id;      
    }
    
  }

  onCloseModal() {
    console.log('Cierro Modal');
    
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
    console.log(array);
    
}

handleClick(){
  console.log('Entro');
  console.log(this.reservaSeleccionada);
  console.log(this.userActive);
  this.visibleInscripcion = true;  
}
reservar(){
  console.log('reservar');
  this.visibleInscripcion = false;
  
}



}
