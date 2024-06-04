import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../services/navbarService/navbar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

constructor(
  private navbarService: NavbarService
){
   
}






openModal() {
throw new Error('Method not implemented.');
}

logout() {
throw new Error('Method not implemented.');
}
toggleNavbar() {
  this.navbarService.collapseNavbar();
}
selectedOption: any;
activeUser: any;
selectOption(arg0: string) {
  this.selectedOption = arg0;
    this.toggleNavbar();

}
currentTheme: any;

}
