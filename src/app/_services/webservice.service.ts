import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '@app/invoice';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  dialogData: any;
  user: User;
  constructor(private http: HttpClient, private accountService: AccountService) { this.user = this.accountService.userValue }


  getDialogData() {
    return this.dialogData;
  }

  public getInvoices() {
    console.log("War ich schon hier?" + this.user.username);
    const headers = new HttpHeaders()
      .set('username', this.user.username)
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get(`${environment.apiUrl}/api/v1/invoice`, { 'headers': headers });
  }
  public getSalaries() {
    console.log("War ich schon hier?" + this.user.username);
    const headers = new HttpHeaders()
      .set('username', this.user.username)
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get(`${environment.apiUrl}/api/v1/salary`, { 'headers': headers });
  }

  public getKPIOutcoming() {
    const headerDict = {
      'username': this.user.username
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return fetch(`${environment.apiUrl}/api/v1/invoice`, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res;
      })
  }

  public getKPIIncoming() {
    const headerDict = {
      'username': this.user.username
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return fetch(`${environment.apiUrl}/api/v1/salary`, requestOptions)
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

    console.log('Username' + this.user.username);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');

    return fetch(`${environment.apiUrl}/api/v1/invoice/categories`, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res;
      })
  }

  public getIncomingCategories() {
    const headerDict = {
      'username': this.user.username
      
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };

    console.log('Username' + this.user.username);
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');

    return fetch(`${environment.apiUrl}/api/v1/salary/categories`, requestOptions)
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

    console.log('Username' + this.user.username);
    return fetch(`${environment.apiUrl}/api/v1/invoice/invoicebydate`, requestOptions)
      .then(res => res.json())
      .then(res => {
        return res;
      })
  }

  public getSalariesByMonth() {
    const headerDict = {
      'username': this.user.username
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };

    return fetch(`${environment.apiUrl}/api/v1/salary/salarybydate`, requestOptions)
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

  public deleteSalary(_id: string): void {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');
    this.http.delete(`${environment.apiUrl}/api/v1/salary/${_id}`).subscribe(data => {
      console.log('successfully deleted')
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.message, 8000);
      }
    );

  }
  

  delete(_id: string): void {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', 'https://finance-planner-api-dhbw.herokuapp.com');
    headers.append('Access-Control-Allow-Credentials', 'true');
    this.http.delete(`${environment.apiUrl}/api/v1/invoice/${_id}`).subscribe(data => {
      console.log('successfully deleted')
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.message, 8000);
      }
    );
  }

  updateOutcomming(_id, data): void {
  
    this.http.put(`${environment.apiUrl}/api/v1/invoice/${_id}`, data).subscribe({
      next: data => {
      },
      error: error => {
          console.error(JSON.stringify(error));
      }
  });
  }
  updateIncomming(_id, data): void {
  
    this.http.put(`${environment.apiUrl}/api/v1/salary/${_id}`, data).subscribe({
      next: data => {
      },
      error: error => {
          console.error(JSON.stringify(error));
      }
  });
  }

}


