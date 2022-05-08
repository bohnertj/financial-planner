import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Salary } from '../salary';
import { WebserviceService } from '../_services/webservice.service';
import { Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSalaryComponent } from '@app/dialog_salary/delete_salary/delete.component';
import { EditSalaryComponent } from '@app/dialog_salary/edit_salary/edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { AddSalaryComponent } from '@app/dialog_salary/add_salary/add_salary.component';

@Component({
  selector: 'app-display-incomming-data',
  templateUrl: './display-incomming-data.component.html',
  styleUrls: ['./display-incomming-data.component.css']
})
export class DisplayIncommingDataComponent implements OnInit {

  @Input('EXAMPLE_DATA') EXAMPLE_DATA!: Salary[];
  displayColums: string[] = ['title', 'categorie', 'amount', 'date', 'actions'];
  dataSource = new MatTableDataSource<Salary>(this.EXAMPLE_DATA);
  constructor(private service: WebserviceService,
    public httpClient: HttpClient,
    public dialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.refresh();
    this.getAllSalaries();
  }

  refresh() {
    this.getAllSalaries();
  }
  public getAllSalaries() {
    let resp = this.service.getSalaries();
    resp.subscribe(report => this.dataSource.data = report as Salary[]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addNew() {
    const dialogRef = this.dialog.open(AddSalaryComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
      this.refresh();
    });
  }

  startEdit(_id: string, title: string, categorie: string, amount: number, date: Date) {
    const dialogRef = this.dialog.open(EditSalaryComponent, {
      data: { _id: _id, title: title, categorie: categorie, amount: amount, date: date },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.service.updateOutcomming(_id, dialogRef);
      }
      this.refresh();
    });
  }


  deleteItem(_id: string, title: string, categorie: string, amount: number, date: Date) {
    const dialogRef = this.dialog.open(DeleteSalaryComponent, {
      data: { _id: _id, title: title, categorie: categorie, amount: amount, date: date },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.refresh();
        this.service.delete(_id);
      }
      this.refresh();
    });
  }
}
