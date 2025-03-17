import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { log } from 'node:console';
import { Student, StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [FormComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {
  constructor(
    private _studentService: StudentService,
    private router: Router
  ) {}

  actionEmitter(event: any): void {
    console.log(event);

    if (event.isNew) this._studentService.setStudent(event.student).subscribe();
    else
      this._studentService.updateStudent(event.student, event.id).subscribe();
    this.router.navigate(['/students']);
  }
}
