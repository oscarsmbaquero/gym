import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', component:  LoginComponent},
    {path: 'reservas', component:  ReservasComponent, canActivate: [AuthGuard]},
    {path: 'inicio', component:  HomeComponent},
    {path: 'login', component:  LoginComponent},
    // {path: '', redirectTo:'/login', pathMatch:'full'},
    {path: '**', redirectTo:'inicio', pathMatch:'full'}

];
