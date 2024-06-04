import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../../services/navbar.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  private selectedOptionSubject = new BehaviorSubject<string>('');
  selectedOption$ = this.selectedOptionSubject.asObservable();

  selectedOption = '';
  currentTheme : any;



  constructor(private navbarService: NavbarService) {
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      this.selectedOptionSubject.next(savedOption);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
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

  activeUser: any;
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
