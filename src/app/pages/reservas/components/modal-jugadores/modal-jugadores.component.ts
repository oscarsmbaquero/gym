import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
//PRIMENG
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
//SERVICIOS
import { EventService } from '../../../../core/services/modal.service';
import { SetinstalacionesService } from '../../../../core/services/set.instalaciones.services';


@Component({
  selector: 'app-modal-jugadores',
  standalone: true,
  imports: [DialogModule, AvatarModule, CommonModule],
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

   /**
   * fijar las letras en el avatar
   */
   palabrasAvatar = '';

  constructor(
    private eventService : EventService,
    private setinstalacionesService: SetinstalacionesService
  ){

  }


  ngOnInit(): void {
    console.log(this.reservaSeleccionada.usuarios_apuntados);
    this.horaPista = this.reservaSeleccionada.time;
    this.jugadores = this.reservaSeleccionada.usuarios_apuntados;
    this.agregarIniciales(this.jugadores)
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



}
