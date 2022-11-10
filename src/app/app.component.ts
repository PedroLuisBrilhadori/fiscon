import { FormControl, FormGroup } from '@angular/forms';

import { Component } from '@angular/core';
import { MyTel } from './tel-input/tel-input.component';
import { TableColumnModel } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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

  dataSource = [{ name: 'pedro', tel: 'teste' }];

  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', '')),
    name: new FormControl(''),
  });

  clearForm() {
    this.form.setValue({ tel: new MyTel('', '', ''), name: '' });
  }
}
