import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Student } from '../students-table/students-table.component';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  httpOptions: any;
  baseURL: string
  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8888';

    this.httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        Accept: 'Application/json'
      }
    };
  }

  addStudent(student: Student) {
    return this.http.post(`${this.baseURL}/`, student, this.httpOptions);
  }

  getStudents(): Observable<Student> {
    return this.http.get(this.baseURL) as Observable<Student>;
  }

  deleteStudent(student: Student) {
    return this.http.delete(`${this.baseURL}/${student.id}`);
  }

  updateStudent(updatedStudent: Student) {
    return this.http.put<void>(`${this.baseURL}/${updatedStudent.id}`, updatedStudent, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage.toString());
  }
}

