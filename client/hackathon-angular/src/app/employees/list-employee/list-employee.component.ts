import { DatePipe } from '@angular/common';
import { Employee } from './../Employee';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employees/Employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale);

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
  public empSelect!: Employee
  public EmployeeSelected!: any;
  public resgisterForm!: FormGroup;

  constructor(
    private service: EmployeeService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,) {
    this.createForm();
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.refreshEmployeeList();
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

  updateEmployee() {
    if (this.EmployeeForm.valid) {
        this.empSelect = {
          id: this.EmployeeSelected.id,
          cpf:this.EmployeeForm.value.cpf,
          name: this.EmployeeForm.value.name,
          birth: this.EmployeeForm.value.birth,
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
  }

  editEmployee(){
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

    let dateString = employee.birth;

    this.EmployeeSelected = {
      id: employee.id,
      cpf:employee.cpf,
      name: employee.name,
      birth: employee.birth,
      phone: employee.phone
     };

    this.EmployeeForm.patchValue(employee);
  }

  format<Date>(d :Date) {

  }

  back() {
    this.EmployeeSelected = null;
  }

  refreshEmployeeList(){
    this.back();

    this.service.getEmployeeList().subscribe(data =>{
      this.EmployeeList = data;
    });
  }
}
