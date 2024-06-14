import { Component, Input, OnInit } from '@angular/core';
//PRIMENG
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
//SERVICIOS
import { EventService } from '../../../../core/services/modal.service';
import { SetinstalacionesService } from '../../../../core/services/set.instalaciones.services';


@Component({
  selector: 'app-modal-jugadores',
  standalone: true,
  imports: [DialogModule, AvatarModule],
  templateUrl: './modal-jugadores.component.html',
  styleUrl: './modal-jugadores.component.scss'
})
export class ModalJugadoresComponent implements OnInit{

  @Input() isVisible: boolean = false;

  visible: boolean = true;

  instalaciones: any[] = [];

  constructor(
    private eventService : EventService,
    private setinstalacionesService: SetinstalacionesService
  ){

  }


  ngOnInit(): void {
    this.setinstalacionesService.getUsuariosReserva().subscribe(
      instalaciones => {
        console.log('Instalaciones obtenidas en el componente:', instalaciones);
        this.instalaciones = instalaciones;
        console.log('Instalaciones actualizadas en el componente:', this.instalaciones);
      },
      error => {
        console.error('Error al obtener las instalaciones:', error);
      }
    );
  }
  // openModal(){    
  //   this.eventService.openModalDetalleOpiniones();
  // }

  onCloseModal() {
    this.eventService.closeModal();
  }

}
