import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ModalJugadoresComponent } from './pages/reservas/components/modal-jugadores/modal-jugadores.component';
import { EventService } from './core/services/modal.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterLink, ModalJugadoresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gym';

  scrollPosition = 0;

  modalAbierto: boolean = false;
  private abrirModalSubscription: Subscription | undefined;
  private cerrarModalSubscription: Subscription | undefined;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
  }

  constructor( private eventService: EventService){
   
  }

  ngOnInit(): void {
    console.log('hole');
    
    this.abrirModalSubscription = this.eventService.abrirModal$.subscribe(() => {
      console.log('abrir');
      this.abrirModal();
    });
    // this.abrirModalSubscription = this.eventService.abrirModal$.subscribe(() => {
    //   console.log('abrir');
    //   this.abrirModal();
    // });
  }

  scrollToTop() {
    // Usa JavaScript puro para hacer scroll suavemente hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  abrirModal(){
    this.modalAbierto = true;
    }

    
  cerrarModal(){
    this.modalAbierto = false;
      }
}
