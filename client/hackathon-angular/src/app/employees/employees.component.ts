import { Employee } from './Employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employees/Employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private service: EmployeeService, private fb: FormBuilder) {
    this.createForm();
  }

  public EmployeeForm!: FormGroup;
  public EmployeeList: any = [];
  public ModalTitle!: string;
  public AtivateAddEditEmployeeComp: boolean = false;
  public newOff!: Employee;
  public EmployeeSelected: any;
  public Add = false;


  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  createForm(){
    this.EmployeeForm = this.fb.group({
      name:['', Validators.required],
      code: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  addOrUpdateEmployee() {
    if (this.EmployeeForm.valid) {
      if (this.Add) {
        this.newOff = {id: 0, ...this.EmployeeForm.value};
        this.service.addEmployee(this.newOff)
        .subscribe(
          () => {
            this.refreshEmployeeList();
            console.log('Agencia salva com sucesso!');
          }, (error: any) => {
            console.log(`Erro: Agencia não pode ser salva!`);
            console.error(error);
          }
        );
      } else {
        this.newOff = {id: this.EmployeeSelected.id, ...this.EmployeeForm.value};
        this.service.updateEmployee(this.newOff)
        .subscribe(
          () => {
            this.refreshEmployeeList();
            console.log('Agencia salva com sucesso!');
          }, (error: any) => {
            console.log(`Erro: Agencia não pode ser salva!`);
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
          console.log('Agencia excluida com sucesso!');
        }, (error: any) => {
          console.log(`Erro: Agencia não pode ser excluida!`);
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
