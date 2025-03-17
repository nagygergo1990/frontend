import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student/list.component';
import { StudentComponent } from './components/student/student.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/-1', component: StudentComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: '**', redirectTo: '/students' }, // 404 oldal átirányítása
];
