import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full'},
  { path:'employee', component:EmployeesComponent },
  { path:'list-employee', component:ListEmployeeComponent },
  { path:'add-employee', component:AddEmployeeComponent },
  { path:'home', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
