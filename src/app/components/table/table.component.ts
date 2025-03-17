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
  selectedObject: number | undefined;

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
  delete(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.event.emit({ selectedObject: id, action: 'delete' });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  edit(event: Event, id: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
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
