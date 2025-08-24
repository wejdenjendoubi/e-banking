import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';

import { Home } from './home/home';
import { ParametresComponent } from './parametres/parametres';
import { OperationsComponent } from './operations/operations';
import { VirementsComponent } from './virements/virements';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';
import { ComptesComponent } from './comptes/comptes';




export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'home', component: Home,
    children: [
      { path: 'virement', component: VirementsComponent },
      { path: 'parametres', component: ParametresComponent },
      { path: 'operations', component: OperationsComponent },
      { path: 'comptes', component: ComptesComponent },


    ]
   },



  { path: '**', redirectTo: '' },
];
