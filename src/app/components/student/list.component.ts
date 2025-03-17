import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { TableComponent } from '../table/table.component';
import { TableModule } from 'primeng/table';
import { log } from 'console';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'student-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [TableComponent, TableModule, CommonModule],
  providers: [MessageService],
})
export class StudentListComponent implements OnInit {
  title: string = 'Felhasználó karbantartás';

  /**
   * Az adatokat fogadó változó.
   */
  list$: Observable<any> | undefined;

  /**
   * Toolbar beállítások.
   */
  newButtonUrl: string = '/user/add';

  /**
   * A tábla oszlopait tartalmazó tömb.
   *
   *  field: A szerverről érkező kiválasztott JSON adatok.
   *  header: Ez fog megjelenni a táblázat fejlécén.
   */
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Név' },
    { field: 'email', header: 'E-mail' },
  ];

  constructor(
    private _routes: ActivatedRoute,
    private _studentService: StudentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list$ = this._studentService.getStudents();
  }

  /**
   * Az action-öket fogadó függvény.
   *
   * Egy JSON objektumot fogad és dolgoz fel.
   * { selectedObject: any, action: string }
   *
   * Event.selectedObject: A kiválasztott objektum.
   * Event.action: Jelenleg két action-nel dolgozik: delete, modify.
   *
   * @param event: JSON objektum
   */
  actionEmitter(event: any): void {
    if (event.action == 'delete') {
      this._studentService.deleteStudentById(event);
      this.list$ = this._studentService.getStudents();
    }
    //   this._studentService.deleteStudentById(event);
    // }
    if (event.action == 'new') {
      this.router.navigate(['/students/', '-1']);
      // this._helperService.redirectTo(`/user/edit/${event.selectedObject.id}`);
    }
    if (event.action == 'edit') {
      console.log(event);

      this.router.navigate(['/students/', event.id]);
      // this._helperService.redirectTo(`/user/edit/${event.selectedObject.id}`);
    }
  }
}
