
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Invoice } from '@app/invoice';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';


interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  user: User;
  add = false;
  submitted = false;
  message = false;
  invoiceForm: FormGroup;
  guid: string;
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


  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice,
    private formBuilder: FormBuilder, private http: HttpClient, private accountService: AccountService) {
      this.user = this.accountService.userValue;
  }

  invalidTitle() {
    return (this.submitted && (this.serviceErrors.title != null || this.invoiceForm.controls.title.errors != null));
  }

  invalidCategory() {
    return (this.submitted && (this.serviceErrors.category != null || this.invoiceForm.controls.category.errors != null));
  }

  invalidDate() {
    return (this.submitted && (this.serviceErrors.date != null || this.invoiceForm.controls.date.errors != null));
  }

  invalidAmount() {
    return (this.submitted && (this.serviceErrors.amount != null || this.invoiceForm.controls.amount.errors != null));
  }
  ngOnInit() {
    this.invoiceForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      categorie: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', [Validators.required, Validators.maxLength(75)]],
      amount: ['', [Validators.required, Validators.maxLength(50)]],
      username: this.user.username
    });
  }


  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log('Selected Item: ' + this.selectedValue)
    if (this.invoiceForm.invalid == true) {
      return;
    }
    else {
      this.message = true;
      let data: any = Object.assign({ guid: this.guid }, this.invoiceForm.value);
      console.log("Hinzugefügt");
      console.log("Datum: "+this.invoiceForm.value.date);
      this.http.post(`${environment.apiUrl}/api/v1/invoice`, data).subscribe((data: any) => {

        console.log(data.invoice.title);

        let path = '/api/v1/invoice' + data.invoice.title;

      }, error => {
        this.serviceErrors = error.error.error;
      });

      this.add = true;
      this.dialogRef.close();
    }
  }
}