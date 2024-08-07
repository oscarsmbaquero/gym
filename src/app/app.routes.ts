import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { VerReservasComponent } from './pages/reservas/components/ver-reservas/ver-reservas.component';
import { MisReservasComponent } from './pages/reservas/components/mis.reservas/mis.reservas.component';
import { AnadirReservaComponent } from './pages/reservas/components/anadir-reserva/anadir-reserva.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

export const routes: Routes = [
    {path: '', component:  HomeComponent},
    {path: 'login', component:  LoginComponent},
    {path: 'register', component:  RegisterComponent},
    {path: 'calendario', component:  VerReservasComponent, canActivate: [AuthGuard]},
    {path: 'mis-reservas', component:  MisReservasComponent, canActivate: [AuthGuard]},
    {path: 'reservar', component:  AnadirReservaComponent, canActivate: [AuthGuard]},
    {path: 'clientes', component:  ClientesComponent},
    // {path: 'login', component:  LoginComponent},
    {path: '', redirectTo:'', pathMatch:'full'},
    {path: '**', redirectTo:'', pathMatch:'full'}

];
