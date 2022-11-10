import { FormControl, FormGroup } from '@angular/forms';

import { Component } from '@angular/core';
import { MyTel } from './tel-input/tel-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fiscon';

  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', '')),
    name: new FormControl(''),
  });

  clearForm() {
    this.form.setValue({ tel: new MyTel('', '', ''), name: '' });
  }
}
