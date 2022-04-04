import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '@app/invoice';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { HttpHeaders,HttpErrorResponse } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class WebserviceService{
  dialogData: any;
  user: User;
  constructor(private http: HttpClient, private accountService: AccountService) { this.user = this.accountService.userValue }
  

getDialogData() {
  return this.dialogData;
}

  public getInvoices() {
    console.log("War ich schon hier?" + this.user.username);
    const headers= new HttpHeaders()
    .set('username',  this.user.username)

  return this.http.get(`${environment.apiUrl}/api/v1/invoice`, { 'headers': headers });
}

  public getUsers() {
    const headerDict = {
      'username': this.user.username
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
  return fetch(`${environment.apiUrl}/api/v1/invoice`,requestOptions)
    .then(res => res.json())
    .then(res => {
      return res;
    })
}

  public getCategories() {
    const headerDict = {
      'username': this.user.username
    }

    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };

    console.log('Username'+ this.user.username);
  return fetch(`${environment.apiUrl}/api/v1/invoice/categories`, requestOptions)
    .then(res => res.json())
    .then(res => {
      return res;
    })
}

public getInvoicesByMonth() {
  const headerDict = {
    'username': this.user.username
  }

  const requestOptions = {                                                                                                                                                                                 
    headers: new Headers(headerDict), 
  };

  console.log('Username'+ this.user.username);
return fetch(`${environment.apiUrl}/api/v1/invoice/invoicebydate`,requestOptions)
  .then(res => res.json())
  .then(res => {
    return res;
  })
}


public delteInvoices(id: string) {

  console.log("Jetzt wird gelöscht mit id" + id);
  return this.http.get(`${environment.apiUrl}/api/v1/invoice/${id}`);


//return this.http.delete(`${environment.apiUrl}/api/v1/invoice/${id}`);
}

delete(_id: string):void {
  this.http.delete(`${environment.apiUrl}/api/v1/invoice/${_id}`).subscribe(data => {
    console.log(data['']);
    console.log('successfully deleted')
    },
    (err: HttpErrorResponse) => {
    console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    }
  );
}

updateIncoming(_id:string, data:any):void {
  this.http.put(`${environment.apiUrl}/api/v1/invoice/${_id}`, data).subscribe(data => {
    console.log(data['']);
    },
    (err: HttpErrorResponse) => {
    console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    }
  );
}
}
