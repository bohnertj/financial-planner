import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { WebserviceService } from '@app/_services/webservice.service';
import { HttpClient } from "@angular/common/http";
import { environment } from '@environments/environment';
import { Invoice } from '@app/invoice';


interface Category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  invoiceForm: FormGroup;
  add = true;
  submitted = true;
  message = false;
  serviceErrors: any = {};
  selectedValue: string;
  selectedCategory: string;


  categories: Category[] = [
    { value: 'Einkaufen', viewValue: 'Einkaufen' },
    { value: 'Mobilität', viewValue: 'Mobilität' },
    { value: 'Freizeit', viewValue: 'Freizeit' },
    { value: 'Mitgliedschaften', viewValue: 'Mitgliedschaften' },
    { value: 'Investments', viewValue: 'Investments' },
    { value: 'Shopping', viewValue: 'Shopping' },
    { value: 'Wohnen', viewValue: 'Wohnen' },
    { value: 'Urlaub', viewValue: 'Urlaub' },
    { value: 'Sonstiges', viewValue: 'Sonstiges' },
  ];

  constructor(public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public webservice: WebserviceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.invoiceForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required, Validators.maxLength(50)]],
      categorie: [this.data.categorie, [Validators.required, Validators.maxLength(50)]],
      date: [this.data.date, [Validators.required, Validators.maxLength(75)]],
      amount: [this.data.amount, [Validators.required, Validators.maxLength(50)]],
    });
  }
  formControl = new FormControl('', [
    Validators.required
  ]);


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(_id: string): void {
    this.message = true;
    let data: any = Object.assign(this.invoiceForm.value);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');
    this.http.put(`${environment.apiUrl}/api/v1/invoice/${_id}`, data).subscribe((data: any) => {
    }, error => {
      this.serviceErrors = error.error.error;
    });

  }
}
