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
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import { TopmenuComponent } from './topmenu/topmenu.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeService } from './employees/Employee.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ListEmployeeComponent,
    AddEmployeeComponent,
    TopmenuComponent,
    DateTimeFormatPipePipe,
    SidebarComponent,
    HomeComponent
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
export class AppModule {

}
