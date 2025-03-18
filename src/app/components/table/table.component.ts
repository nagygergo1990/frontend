import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { log } from 'node:console';
import { Student } from '../../services/student.service';

@Component({
  selector: 'rate-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    TableModule,
    SplitButtonModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
  ],
})
export class TableComponent implements OnInit {
  /**
   * Inputs for table.
   */
  @Input() data: any;
  @Input() tableColumns: any;

  @Output() event = new EventEmitter<Object>();

  @ViewChild('dt') table: Table | any;
  @ViewChild('filter') filter: ElementRef | any;

  /**
   * Selected object ID (for modify / delete)
   */
  selectedObject: Student | undefined;

  /**
   * Selected rows (checkbox)
   *
   */
  selectedData: any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  /**
   *
   * Function for emit value for child item.
   *
   * @param objectId: number (for example product id)
   */
  //   public confirm1(event: any): void {
  //     console.log(event);

  //     this.event.emit({ selectedObject: objectId, action: action });
  //   }
  delete(id: any, name: any) {
    this.confirmationService.confirm({
      message: 'Biztos törölni szeretné ' + name + ' felhasználót?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Mégsem',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Törlés',
      },
      accept: () => {
        this.event.emit({ name: name, id: id, action: 'delete' });

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Sikeres törlés',
        });
      },
    });
  }

  edit(id: any) {
    this.event.emit({ id: id, action: 'edit' });
  }
  new() {
    this.event.emit({ action: 'new' });
  }
  /**
   * Tábla globális kereső törlés.
   * @param uri
   */
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
