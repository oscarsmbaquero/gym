import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { VerReservasComponent } from './pages/reservas/components/ver-reservas/ver-reservas.component';
import { MisReservasComponent } from './pages/reservas/components/mis.reservas/mis.reservas.component';
import { AnadirReservaComponent } from './pages/reservas/components/anadir-reserva/anadir-reserva.component';

export const routes: Routes = [
    {path: '', component:  LoginComponent},
    {path: 'reservas', component:  ReservasComponent, canActivate: [AuthGuard]},
    {path: 'calendario', component:  VerReservasComponent, canActivate: [AuthGuard]},
    {path: 'mis-reservas', component:  MisReservasComponent, canActivate: [AuthGuard]},
    {path: 'reservar', component:  AnadirReservaComponent, canActivate: [AuthGuard]},
    {path: 'inicio', component:  HomeComponent},
    {path: 'login', component:  LoginComponent},
    // {path: '', redirectTo:'/login', pathMatch:'full'},
    {path: '**', redirectTo:'inicio', pathMatch:'full'}

];
