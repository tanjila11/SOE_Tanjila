import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';


import { MenuService } from './menu.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';



import { OperationalunitComponent } from './operationalunit/operationalunit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import {OuAddEditComponent } from './ou-add-edit/ou-add-edit.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatHint} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { UnitAddEditComponent } from './unit-add-edit/unit-add-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DatePipe } from '@angular/common';
import { ValidationServiceComponent } from './validationServiceComponent';
//import { ControlMessagesComponent } from './controlMessagesComponent';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    OperationalunitComponent,
    OuAddEditComponent,
    UnitAddEditComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
    //,ControlMessagesComponent
 
   

    
  ],
  providers: [MenuService, AuthenticationService,DatePipe,ValidationServiceComponent
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
