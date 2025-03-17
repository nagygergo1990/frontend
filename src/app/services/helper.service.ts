// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Table } from 'primeng/table';
// import { map, Observable, shareReplay } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';

// @Injectable({
//   providedIn: 'root',
// })
// export class HelperService {
//   constructor(
//     private _confirmationService: ConfirmationService,
//     private _messageService: MessageService,
//     private _router: Router,
//     private _httpClient: HttpClient
//   ) {}

//   parseData(data: string | any[]) {
//     let rows = [];
//     let keys = Object.keys(data[0]);

//     for (let i = 1; i < data.length; i++) {
//       let helperVar = [];
//       for (let j = 1; j < keys.length; j++) {
//         helperVar.push(data[i][keys[j]]);
//       }
//       rows.push(helperVar);
//       helperVar = [];
//     }

//     return rows;
//   }

//   formatDate(date: string | number | Date) {
//     var d = new Date(date),
//       month = '' + (d.getMonth() + 1),
//       day = '' + d.getDate(),
//       year = d.getFullYear();

//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;

//     return [year, month, day].join('-');
//   }

//   /**
//    *
//    * A tábla rendezésekért felelős service.
//    *
//    */
//   customSort(event: SortEvent) {
//     event.data?.sort(
//       (data1: { [x: string]: any }, data2: { [x: string]: any }) => {
//         let value1 = data1[event.field!];
//         let value2 = data2[event.field!];
//         let result = null;

//         if (value1 == null && value2 != null) result = -1;
//         else if (value1 != null && value2 == null) result = 1;
//         else if (value1 == null && value2 == null) result = 0;
//         else if (typeof value1 === 'string' && typeof value2 === 'string')
//           result = value1.localeCompare(value2);
//         else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

//         return event.order! * result;
//       }
//     );
//   }

//   /**
//    * A megerősítő  ablakot megvalósító funkció.
//    */
//   deleteConfirm(name: string, id: number, command: () => any) {
//     this._confirmationService.confirm({
//       message: 'Biztos, hogy törölni szeretné: ' + name,
//       header: 'Megerősítés',
//       icon: 'pi pi-exclamation-triangle',
//       accept: () => {
//         this._messageService.add({
//           severity: 'info',
//           summary: 'Confirmed',
//           detail: 'You have accepted',
//         });

//         command();
//       },
//     });
//   }

//   /**
//    * Átirányításért felelős funckió.
//    * @param uri
//    */
//   redirectTo(uri: string) {
//     this._router
//       .navigateByUrl('/', {
//         skipLocationChange: true,
//       })
//       .then(() => this._router.navigate([uri]));
//   }

//   /**
//    * Tábla globális kereső törlés.
//    */
//   clear(table: Table) {
//     table.clear();
//   }

//   /**
//    * Get the data from the json file (in assets/data)
//    */
//   getLocalData(fileName: string): Observable<any> {
//     return this._httpClient.get<any>(`./assets/data/${fileName}.json`).pipe(
//       map((data) => {
//         return data;
//       }),
//       shareReplay(1)
//     );
//   }
// }
