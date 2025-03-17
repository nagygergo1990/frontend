import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Student } from '../models/Student';

import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';
@Component({
  selector: 'app-form',
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  studentId: string | null = null;
  @Output() event = new EventEmitter<Object>();
  student = <Student>{};
  constructor(
    private router: ActivatedRoute,
    private _studentService: StudentService
  ) {}
  isNew: boolean = true;
  ngOnInit() {
    this.studentId = this.router.snapshot.paramMap.get('id');
    console.log(this.router.snapshot.paramMap.get('id'));

    this.isNew = this.router.snapshot.paramMap.get('id') === null; // Azonnali lekérés

    if (!this.isNew) {
      this._studentService.getStudentById(this.studentId!).subscribe(
        (data) => {
          this.student = data; // Adatok betöltése a student objektumba
        },
        (error) => {
          console.error('Hiba történt az adatok betöltése közben:', error);
        }
      );
    } else {
      this.student = { id: '', name: '', email: '' };
    }
  }

  emit() {
    this.event.emit({
      student: this.student,
      isNew: this.isNew,
      id: this.studentId,
    });
  }
}
