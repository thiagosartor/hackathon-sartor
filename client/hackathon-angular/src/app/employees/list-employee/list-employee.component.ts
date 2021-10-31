import { Employee } from './../Employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employees/Employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  public EmployeeForm!: FormGroup;
  public EmployeeList: any = [];
  public ModalTitle!: string;
  public AtivateAddEditEmployeeComp: boolean = false;
  public newEmp!: Employee;
  public empSelect!: Employee
  public EmployeeSelected: any;
  public Add = false;

  constructor(private service: EmployeeService, private fb: FormBuilder) {
    this.createForm();
  }

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
