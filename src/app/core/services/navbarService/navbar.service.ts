import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  // private abrirModalSubject = new Subject<void>();

  // abrirModal$ = this.abrirModalSubject.asObservable();

  constructor() { }

  /**
   * funcion para el collapse del navbar
   * 
   */
  collapseNavbar(): void {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    //al iniciar el componente esta collapsado
    if (navbarToggler && navbarToggler.getAttribute('aria-expanded') === 'true') {
      navbarToggler.click();
    }
  }
}
