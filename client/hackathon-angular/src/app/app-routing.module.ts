import { EmployeesComponent } from './employees/employees.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEmployeeComponent } from './employees/add-edit-employee/add-edit-employee.component';

const routes: Routes = [
  { path:'', redirectTo: 'home', pathMatch: 'full'},
  { path:'employee', component:EmployeesComponent },
  { path:'list-employee', component:ListEmployeeComponent },
  { path:'add-edit-employee', component:AddEditEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
