import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from '../invoice';
import { WebserviceService } from '../_services/webservice.service';
import { Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '@app/dialog/add/add.component';
import { DeleteComponent } from '@app/dialog/delete/delete.component';
import { EditComponent } from '@app/dialog/edit/edit.component';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'display-outcomming-data',
  templateUrl: './display-outcomming-data.component.html',
  styleUrls: ['./display-outcomming-data.component.css']
})
export class DisplayOutcommingDataComponent implements OnInit {

  @Input('EXAMPLE_DATA') EXAMPLE_DATA!: Invoice[];
  displayColums: string[] = ['title', 'categorie', 'amount', 'date', 'actions'];
  dataSource = new MatTableDataSource<Invoice>(this.EXAMPLE_DATA);
  constructor(private service: WebserviceService,
    public httpClient: HttpClient,
    public dialog: MatDialog) { }
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.refresh();
    this.getAllInvoices();
  }

  refresh(){
    this.getAllInvoices();
  }
  public getAllInvoices() {
    let resp = this.service.getInvoices();
    resp.subscribe(report => this.dataSource.data = report as Invoice[]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addNew(){
    const dialogRef = this.dialog.open(AddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
      this.refresh();
    });
  }

  startEdit(_id: string, title: string, categorie: string, amount: number, date: Date) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {_id: _id, title: title, categorie: categorie,amount: amount, date: date},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.service.updateOutcomming(_id,dialogRef);
      }
      this.refresh();
    });
  }


  deleteItem(_id: string, title: string, categorie: string, amount: number, date: Date) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {_id: _id, title: title, categorie: categorie,amount: amount, date: date},
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
