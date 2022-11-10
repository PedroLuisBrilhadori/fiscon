import { ViewChild } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export class TableColumnModel {
  name: string;
  displayName: string;
  sort?: boolean = false;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  /** Propriedade responsavel por exibir os items da tabela */
  @Input('dataSource')
  set dataSource(value: any[]) {
    this._dataSource.data = value;
  }

  /** @hidden */
  get dataSource() {
    return this._dataSource.data;
  }

  /** Propriedade responsavel por criar e exibir as colunas da tabela */
  @Input('displayedColumns')
  displayedColumns: TableColumnModel[];

  @ViewChild(MatTable) table: MatTable<any[]>;

  private _columnsToDisplay: string[] = [];

  /** Propriedade que exibe os nomes das colunas */
  get columnsToDisplay() {
    return this._columnsToDisplay;
  }

  constructor() {}

  /**
   * @hidden
   * Inicializa o dataSouce com o tipo MatTableDataSource
   */
  _dataSource = new MatTableDataSource<any[]>([]);

  ngOnInit() {
    if (this.displayedColumns === undefined) {
      throw Error('A tabela não possui colunas');
    } else {
      this.displayedColumns.forEach((column) => {
        this._columnsToDisplay.push(column.displayName);
      });
    }
  }

  renderRows() {
    this.table.renderRows();
  }

  removeData() {
    this._dataSource.data.pop();
    this.table.renderRows();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();
  }
}
