import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Home } from './home/home';
import { ParametresComponent } from './parametres/parametres';
import { OperationsComponent } from './operations/operations';
import { VirementsComponent } from './virements/virements';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: Home },
  { path: 'parametres', component: ParametresComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'virement', component: VirementsComponent },
  { path: '**', redirectTo: '' },
];
