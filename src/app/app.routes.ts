import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservasComponent } from './pages/reservas/reservas.component';

export const routes: Routes = [
    {path: '', component:  HomeComponent},
    {path: 'reservas', component:  ReservasComponent},
    {path: '', redirectTo:'', pathMatch:'full'},
    {path: '**', redirectTo:'', pathMatch:'full'}

];
