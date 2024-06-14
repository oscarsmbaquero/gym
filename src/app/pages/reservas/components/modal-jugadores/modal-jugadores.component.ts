import { Component, Input } from '@angular/core';
//PRIMENG
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
//SERVICIOS
import { EventService } from '../../../../core/services/modal.service';


@Component({
  selector: 'app-modal-jugadores',
  standalone: true,
  imports: [DialogModule, AvatarModule],
  templateUrl: './modal-jugadores.component.html',
  styleUrl: './modal-jugadores.component.scss'
})
export class ModalJugadoresComponent {

  @Input() isVisible: boolean = false;

  visible: boolean = true;

  constructor(
    private eventService : EventService
  ){

  }

  // openModal(){    
  //   this.eventService.openModalDetalleOpiniones();
  // }

  onCloseModal() {
    this.eventService.closeModal();
  }

}
