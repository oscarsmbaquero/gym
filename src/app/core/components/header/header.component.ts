import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';
import { UsersService } from '../../services/users.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  private selectedOptionSubject = new BehaviorSubject<string>('home');
  selectedOption$ = this.selectedOptionSubject.asObservable();

  selectedOption = '';
  currentTheme : any;
  activeUser: any;


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
      
      // if (this.activeUser) {
      //   this.activeUserName = this.activeUser.data.user;
      //   this.lettersAvatar(this.activeUserName);
      //   this.obtenerPedidos();
      // }
    });
    
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
  // selectOption(arg0: string) {
  //   this.selectedOption = arg0;
  //   this.toggleNavbar();
  // }
}
