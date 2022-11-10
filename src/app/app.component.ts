import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { MyTel } from './tel-input/tel-input.component';
import { TableColumnModel, TableComponent } from './table/table.component';
import { ViewChild } from '@angular/core';

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

  dataSource: { name: string; tel: string }[] = [];

  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''), [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor() {}

  clearForm() {
    this.form.setValue({ tel: new MyTel('', '', ''), name: '' });
  }

  addUser() {
    const { tel, name } = this.form.value;

    if (!this.validInput()) return;

    this.dataSource.push({
      name,
      tel: `(${tel?.area}) ${tel?.exchange}-${tel?.subscriber}`,
    });

    this.table.renderRows();
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
