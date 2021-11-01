import { Employee } from './../Employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employees/Employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  public EmployeeForm!: FormGroup;
  private newEmp!: { id: number; cpf: any; name: any; birth: Date; phone: any; };
  private router!: Router;

  constructor(private service: EmployeeService, private fb: FormBuilder, router: Router) {
    this.createForm();
    this.router = router;
  }
  ngOnInit() {
  }

  createForm(){
    this.EmployeeForm = this.fb.group({
      name:['', Validators.required],
      cpf: ['', Validators.required],
      birth: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  addOrUpdateEmployee() {
    if (this.EmployeeForm.valid) {
        this.newEmp = {
          id: 0,
          cpf:this.EmployeeForm.value.cpf,
          name: this.EmployeeForm.value.name,
          birth: (new Date(this.EmployeeForm.value.birth)),
          phone: this.EmployeeForm.value.phone
         };
        this.service.addEmployee(this.newEmp)
        .subscribe(
          () => {
            this.router.navigate(['employee']);
          }, (error: any) => {
            console.error(error);
          }
        );
      }
  }

  newEmployee() {
    this.EmployeeForm.reset();
  }
}
