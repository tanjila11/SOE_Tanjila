import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { OperationalunitComponent } from './operationalunit/operationalunit.component';



const routes: Routes = [

  //{ path: '', redirectTo: '/home', pathMatch: 'full' },


 { path: 'login', component: LoginComponent },
 { path: 'ou', component: OperationalunitComponent },
 //{ path: 'ouNew', component: OuintComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
