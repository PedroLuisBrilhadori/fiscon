import { ViewChild, AfterViewInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
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
export class TableComponent implements AfterViewInit {
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
  set displayedColumns(value: TableColumnModel[]) {
    this._displayedColumns = value;
    this._columnsToDisplay = value.map((x) => x?.displayName);
  }

  get displayedColumns() {
    return this._displayedColumns;
  }

  @Input('sortingDataAccessor') sortingDataAccessor: (
    data: any,
    sortHeaderId: string
  ) => string | number;

  @ViewChild(MatTable) table: MatTable<any[]>;

  @ViewChild(MatSort) sort: MatSort;

  @Output('removeElement') removeElementEmmiter: EventEmitter<any> =
    new EventEmitter<any>();

  private _columnsToDisplay: string[] = [];

  private _displayedColumns: TableColumnModel[];

  /** Propriedade que exibe os nomes das colunas */
  get columnsToDisplay() {
    return this._columnsToDisplay;
  }

  constructor(private _cdr: ChangeDetectorRef) {}

  /**
   * @hidden
   * Inicializa o dataSouce com o tipo MatTableDataSource
   */
  _dataSource = new MatTableDataSource<any>([]);

  ngAfterViewInit() {
    this._dataSource.sortingDataAccessor = this.sortingDataAccessor;

    this._dataSource.sort = this.sort;

    this._cdr.detectChanges();
  }

  renderRows() {
    this._dataSource.data = this._dataSource.data;
    this.table.renderRows();
  }

  removeElement(element) {
    this.removeElementEmmiter.emit(element);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();
  }
}
