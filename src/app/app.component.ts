import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { MyTel } from './tel-input/tel-input.component';
import { TableColumnModel, TableComponent } from './table/table.component';
import { ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(TableComponent) table: TableComponent;

  displayedColumns: TableColumnModel[] = [
    {
      name: 'name',
      displayName: 'Nome',
    },
    {
      name: 'tel',
      displayName: 'Telefone',
    },
  ];

  dataSource: { name: string; tel: string; id: string }[] = [];

  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''), [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dialog.open(DialogComponent);
  }

  sortingDataAccessor(item, property) {
    switch (property) {
      case 'Nome':
        return item['name'];
      case 'Telefone':
        return item['tel'];
      default:
        return item[property];
    }
  }

  clearForm() {
    this.form.setValue({ tel: new MyTel('', '', ''), name: '' });
  }

  addUser() {
    const { tel, name } = this.form.value;

    if (!this.validInput()) return;

    this.dataSource.push({
      name,
      tel: `(${tel?.area}) ${tel?.exchange}-${tel?.subscriber}`,
      id: Math.random().toString(16).slice(2),
    });

    console.log(this.table.dataSource);
    this.table.renderRows();
    console.log(this.table.dataSource);
  }

  removeUser(element: any) {
    this.dataSource = this.dataSource.filter(
      (data) => element?.id !== data?.id
    );
  }

  validInput() {
    const { tel, name } = this.form.value;

    if (!tel?.area || !tel?.exchange || !tel?.subscriber || !name) return false;

    if (
      Number.isNaN(tel?.area) ||
      Number.isNaN(tel?.exchange) ||
      Number.isNaN(tel?.subscriber)
    )
      return false;

    if (typeof name !== 'string') return false;

    return true;
  }
}
