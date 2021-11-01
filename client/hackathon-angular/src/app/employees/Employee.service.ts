import { Employee } from './Employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  /*readonly APIUrl = "https://sartor-api.azurewebsites.net/Employee";*/
  readonly APIUrl = "https://localhost:44388/Employee";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  }

  getEmployeeList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl);
  }

  addEmployee(employee: Employee) {
    return this.http.post(this.APIUrl, employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put(this.APIUrl, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.APIUrl}/${id}`);
  }

}
