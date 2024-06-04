import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
currentTheme: any;
year: number = 0;

ngOnInit(): void {
  this.getDate();
}



 /**
   * Metodo para el año en el footer
   */
 getDate(){
  this.year = new Date().getFullYear(); 
}


}
