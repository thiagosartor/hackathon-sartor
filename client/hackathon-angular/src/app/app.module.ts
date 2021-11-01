import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { TopmenuComponent } from './topmenu/topmenu.component';
import { AddEditEmployeeComponent } from './employees/add-edit-employee/add-edit-employee.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeService } from './employees/Employee.service';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ListEmployeeComponent,
    AddEditEmployeeComponent,
    TopmenuComponent,
    DateTimeFormatPipePipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
