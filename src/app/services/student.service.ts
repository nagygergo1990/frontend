// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { log } from 'node:console';

export interface Student {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private _HttpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this._HttpClient.get<Student[]>(this.apiUrl);
  }

  setStudent(student: Student): Observable<Student> {
    return this._HttpClient.post<Student>(this.apiUrl, student);
  }
  updateStudent(student: Student, id: string): Observable<Student> {
    return this._HttpClient.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  getStudentById(id: string): Observable<Student> {
    return this._HttpClient.get<Student>(`${this.apiUrl}/${id}`);
  }

  deleteStudentById(student: any): any {
    console.log(student);

    this._HttpClient
      .delete<Student>(`${this.apiUrl}/${student.id}`)
      .subscribe();
  }
}
