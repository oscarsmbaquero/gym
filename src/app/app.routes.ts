import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { LoginComponent } from './core/components/login/login.component';

export const routes: Routes = [
    {path: '', component:  HomeComponent},
    {path: 'reservas', component:  ReservasComponent},
    {path: 'login', component:  LoginComponent},
    {path: '', redirectTo:'', pathMatch:'full'},
    {path: '**', redirectTo:'', pathMatch:'full'}

];
