import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule,RouterModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent {


  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  defaultSortColumn: string = "name";
  defaultSortOrder: SortDirection = "asc";
  defaultFilterColumn: string = "name";
  filterQuery: string | null = null;

  // cities: MatTableDataSource<City>;
  cities = new MatTableDataSource<City>();

  displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(query: KeyboardEvent | null = null): void {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    if (query) {
      this.filterQuery = (<HTMLInputElement>query.target).value;;
    }
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    let params = new HttpParams()
      .set('pageIndex', event.pageIndex.toString())
      .set('pageSize', event.pageSize.toString())
      .set('sortColumn', this.sort ? this.sort.active : this.defaultSortColumn)
      .set('sortOrder', this.sort ? this.sort.direction : this.defaultSortOrder);

    if (this.filterQuery) {
      params = params
        .set("filterColumn", this.defaultFilterColumn)
        .set("filterQuery", this.filterQuery!);
    }

    this.http.get<any>(this.url, { params })
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        // this.paginator.pageIndex = result.pageIndex;
        // this.paginator.pageSize = result.pageSize;

        this.cities.data = result.data;

      },
        error => console.error(error));
  }

}

/*
So as a rule of thumb you can go for the following:

{ static: true } needs to be set when you want to access the ViewChild in ngOnInit.

{ static: false } can only be accessed in ngAfterViewInit.
This is also what you want to go for when you have a structural directive (i.e. *ngIf) on your element in your template.
*/
