import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule,RouterModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
openModal() {
throw new Error('Method not implemented.');
}
showIconFeddback: any;
chengeTheme() {
throw new Error('Method not implemented.');
}
logout() {
throw new Error('Method not implemented.');
}
toggleNavbar() {
throw new Error('Method not implemented.');
}
selectedOption: any;
activeUser: any;
selectOption(arg0: string) {
throw new Error('Method not implemented.');
}
currentTheme: any;

}
