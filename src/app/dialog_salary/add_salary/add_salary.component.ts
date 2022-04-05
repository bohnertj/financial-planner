
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Salary } from '@app/salary';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';



interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add_salary.component.html',
  styleUrls: ['./add_salary.component.css']
})
export class AddSalaryComponent implements OnInit {
  user: User;
  add = false;
  submitted = false;
  message = false;
  salaryForm: FormGroup;
  guid: string;
  serviceErrors: any = {};
  selectedValue: string;
  selectedCategory: string;


  categories: Category[] = [
    { value: 'Lohn', viewValue: 'Lohn' },
    { value: 'Steuern', viewValue: 'Steuern' },
    { value: 'Divi', viewValue: 'Freizeit' },
    { value: 'Dividenden', viewValue: 'Dividenden' },
    { value: 'Krypto', viewValue: 'Krypto' },
    { value: 'Aktien', viewValue: 'Aktien' },
    { value: 'Miete', viewValue: 'Miete' },
    { value: 'Sonstiges', viewValue: 'Sonstiges' },
  ];


  constructor(public dialogRef: MatDialogRef<AddSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Salary,
    private formBuilder: FormBuilder, private http: HttpClient, private accountService: AccountService) {
      this.user = this.accountService.userValue;
  }

  invalidTitle() {
    return (this.submitted && (this.serviceErrors.title != null || this.salaryForm.controls.title.errors != null));
  }

  invalidCategory() {
    return (this.submitted && (this.serviceErrors.category != null || this.salaryForm.controls.category.errors != null));
  }

  invalidDate() {
    return (this.submitted && (this.serviceErrors.date != null || this.salaryForm.controls.date.errors != null));
  }

  invalidAmount() {
    return (this.submitted && (this.serviceErrors.amount != null || this.salaryForm.controls.amount.errors != null));
  }
  ngOnInit() {
    this.salaryForm = this.formBuilder.group({
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
    if (this.salaryForm.invalid == true) {
      return;
    }
    else {
      this.message = true;
      let data: any = Object.assign({ guid: this.guid }, this.salaryForm.value);
      console.log("Hinzugefügt");
      console.log("Datum: "+this.salaryForm.value.date);
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
      headers.append('Access-Control-Allow-Credentials', 'true');
      this.http.post(`${environment.apiUrl}/api/v1/salary`, data).subscribe((data: any) => {
      }, error => {
        this.serviceErrors = error.error.error;
      });

      this.add = true;
      this.dialogRef.close();
    }
  }
}