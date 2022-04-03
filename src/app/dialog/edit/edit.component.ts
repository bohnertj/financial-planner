import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { WebserviceService } from '@app/_services/webservice.service';
import { HttpClient } from "@angular/common/http";
import { environment } from '@environments/environment';

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

    invalidCategory() {
      return (this.submitted && (this.serviceErrors.category != null || this.invoiceForm.controls.category.errors != null));
    }
  
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

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(_id: string): void {
    let data: any = this.invoiceForm.value;
    console.log('Hier stehen die Daten'+data.date)
    this.webservice.updateIncoming(_id, data);
  }
}
