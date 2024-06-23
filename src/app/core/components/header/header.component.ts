import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  private selectedOptionSubject = new BehaviorSubject<string>('home');
  selectedOption$ = this.selectedOptionSubject.asObservable();

  selectedOption = '';
  currentTheme : any;
  activeUser: any;
   /**
   * fijar las letras en el avatar
   */
   palabrasAvatar = '';


  constructor(
    private navbarService: NavbarService,
    private usersService: UsersService,
    private router: Router,
  ) {
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      this.selectedOptionSubject.next(savedOption);
    }
  }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((user) => {
      this.activeUser = user;
      this.lettersAvatar(this.activeUser.data.user)
    });
    this.selectOption('home') ;
    setTimeout(() => {
      this.navbarService.collapseNavbar();
    }, 0);
    
  }

  openModal() {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.navbarService.collapseNavbar();
    this.usersService.clearCurrentUser();
    this.router.navigate(['/']);
  }
  toggleNavbar() {
    this.navbarService.collapseNavbar();
  }

  
  selectOption(option: string) {
    this.selectedOptionSubject.next(option);
    localStorage.setItem('selectedOption', option); // Guardar en almacenamiento local
    this.toggleNavbar();
  }

  /**
   * funcion para pintar el nombre del avatar, solo la primera letra de las dos primeras palabras
   * @param cadena
   * @param cantidadLetras
   */
  lettersAvatar(cadena: string, cantidadLetras = 1) {
    const palabras = cadena.split(' ');
    // Solo las dos primeras palabras
    const primerasDosPalabras = palabras.slice(0, 2);
    // Iterar sobre cada palabra y extraer las letras especificadas
    const letrasExtraidas = primerasDosPalabras.map((palabra) => {
      return palabra.slice(0, cantidadLetras);
    });
    const resultado = letrasExtraidas.join('');
    this.palabrasAvatar = resultado;
  }
  // selectOption(arg0: string) {
  //   this.selectedOption = arg0;
  //   this.toggleNavbar();
  // }
}
