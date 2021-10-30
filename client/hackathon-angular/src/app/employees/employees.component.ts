import { Employee } from './Employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employees/Employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [ DatePipe ]
})
export class EmployeesComponent implements OnInit {
  constructor(private service: EmployeeService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.createForm();
  }

  public EmployeeForm!: FormGroup;
  public EmployeeList: any = [];
  public ModalTitle!: string;
  public AtivateAddEditEmployeeComp: boolean = false;
  public newEmp!: Employee;
  public empSelect!: Employee
  public EmployeeSelected: any;
  public Add = false;


  ngOnInit(): void {
    this.refreshEmployeeList();
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
      if (this.Add) {
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
            this.refreshEmployeeList();
          }, (error: any) => {
            console.error(error);
          }
        );
      } else {
        this.empSelect = {
          id: this.EmployeeSelected.id,
          cpf:this.EmployeeForm.value.cpf,
          name: this.EmployeeForm.value.name,
          birth: (new Date(this.EmployeeForm.value.birth)),
          phone: this.EmployeeForm.value.phone
         };
        this.service.updateEmployee(this.empSelect)
        .subscribe(
          () => {
            this.refreshEmployeeList();
          }, (error: any) => {
            console.error(error);
          }
        );
      }
      this.Add = false;
    }
  }

  newEmployee() {
    this.createForm();

    this.Add = true;
  }

  employeeDelete(id:number) {
    console.log(this.EmployeeForm.value);
    if (id != 0 ) {
      this.service.deleteEmployee(id).subscribe(
        () => {
          this.refreshEmployeeList();
        }, (error: any) => {
          console.error(error);
        }
      );
    }
  }

  employeeSelect(employee:Employee) {
    this.EmployeeSelected = employee;
    this.EmployeeForm.patchValue(employee);
  }

  back() {
    this.EmployeeSelected = null;
  }

  refreshEmployeeList(){
    this.service.getEmployeeList().subscribe(data =>{
      this.EmployeeList = data;
    });
  }

}
