import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gym';

  scrollPosition = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
  }

  scrollToTop() {
    // Usa JavaScript puro para hacer scroll suavemente hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
