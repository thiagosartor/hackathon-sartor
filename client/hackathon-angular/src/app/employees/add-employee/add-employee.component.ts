import { Employee } from '../Employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employees/Employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public EmployeeForm!: FormGroup;
  private newEmp!: Employee;
  private router!: Router;

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder,
    router: Router) {
    this.createForm();
    this.router = router;
  }

  ngOnInit() {
  }

  createForm(){
    this.EmployeeForm = this.fb.group({
      name:['', [Validators.required,  Validators.maxLength(100), Validators.minLength(5)]],
      cpf: ['',  [Validators.required, Validators.maxLength(14), Validators.minLength(11)]],
      birth: ['', Validators.required],
      phone: ['',  [Validators.required, Validators.maxLength(15), Validators.minLength(10)]]
    });
  }

  get registerFormControl() {
    return this.EmployeeForm.controls;
  }

  addEmployee() {
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
