import { Component, Input, OnInit } from "@angular/core";
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { WebserviceService } from '@app/_services/webservice.service';
import { TestBed } from "@angular/core/testing";
import { getCurrencySymbol, getLocaleDateFormat } from "@angular/common";
import * as moment from 'moment';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.css']
})

export class KpiCardComponent implements OnInit {
  constructor(private services: WebserviceService, private breakpointObserver: BreakpointObserver) { }
  positiveOutcoming: boolean = true;
  positiveIncoming: boolean = true;
  summeOutcoming = 0;
  summeIncoming = 0;
  refSummeIncoming = 0;
  refSummeOutcoming = 0;
  test = 50;
  percentageOutcoming = 0;
  percentageIncoming = 0;
  ngOnInit() {
    this.getAllOutcoming();
    this.getAllIncoming();
    this.getRefSummeOutcoming();
    this.getRefSummeIncoming();
  }


  public getAllOutcoming() {
    this.services.getKPIOutcoming()
      .then(users => {
        var amount = users.map(u => amount = parseInt(u.amount));
        var date = users.map(d => d = (d.date));
        this.summeOutcoming = getSumOutcoming(amount, date);
      })

    function getSumOutcoming(amount, date) {
      let now = moment(new Date()).add(-30, 'days').toDate();
      var total = 0;
      for (var i in amount) {
        let parseDate = moment(date[i]).format('MM/DD/YYYY');
        if (parseDate >= moment(now).format('MM/DD/YYYY')) {
          total += amount[i];
        }
      }
      return total;
    }
    return this.summeOutcoming;
  }
  public getRefSummeOutcoming() {
    this.services.getKPIOutcoming()
      .then(users => {
        var amount = users.map(u => amount = parseInt(u.amount));
        var date = users.map(d => d = (d.date));
        this.refSummeOutcoming = getSumOutcoming(amount, date);
        console.log('Referenssumme: Outcoming '+ this.refSummeOutcoming);
        console.log('Aktuelle Summe: Outcoming '+ this.summeOutcoming);
        if (this.refSummeOutcoming == 0) {
          this.percentageOutcoming = 0;
        }
        else if (this.refSummeOutcoming < this.summeOutcoming) {
          this.percentageOutcoming = Math.round((this.summeOutcoming / this.refSummeOutcoming - 1) * 100);
          this.positiveOutcoming=false;
        }
        else {
          this.percentageOutcoming = Math.round((this.summeOutcoming / this.refSummeOutcoming - 1) * 100);
          this.positiveOutcoming=true;
        }
      })

    function getSumOutcoming(amount, date) {
      let refDateStart = moment(new Date()).add(-30, 'days').toDate();
      let refDateEnd = moment(new Date()).add(-60, 'days').toDate();
      var totalRef = 0;
      for (var i in amount) {

        let p = moment(date[i]);
        let x = moment(p).format('MM/DD/YYYY');

        if (x <= moment(refDateStart).format('MM/DD/YYYY') && x >= moment(refDateEnd).format('MM/DD/YYYY')) {
          console.log(x + ' ist war, mit Betrag' + amount[i]);
          totalRef += amount[i];
        }
      }
      return totalRef;
    }
    return this.refSummeOutcoming;
  }



  public getAllIncoming() {
    this.services.getKPIIncoming()
      .then(users => {
        var amount = users.map(u => amount = parseInt(u.amount));
        var date = users.map(d => d = (d.date));
        this.summeIncoming = getSumIncoming(amount, date);
      })

    function getSumIncoming(amount, date) {
      let now = moment(new Date()).add(-30, 'days').toDate();
      var total = 0;
      for (var i in amount) {
        let parseDate = moment(date[i]).format('MM/DD/YYYY');
        if (parseDate >= moment(now).format('MM/DD/YYYY')) {
          total += amount[i];
        }
      }
      return total;
    }
    return this.summeIncoming;
  }

  public getRefSummeIncoming() {
    this.services.getKPIIncoming()
      .then(users => {
        var amount = users.map(u => amount = parseInt(u.amount));
        var date = users.map(d => d = (d.date));
        this.refSummeIncoming = getSumIncoming(amount, date);
        console.log('Referenssumme Incoming: '+ this.refSummeIncoming);
        console.log('Aktuelle Summe: Incoming '+ this.summeIncoming);
        if (this.refSummeIncoming == 0) {
          this.percentageIncoming = 0;
        }
        else if (this.refSummeIncoming < this.summeIncoming) {
          this.percentageIncoming = Math.round((this.summeIncoming / this.refSummeIncoming - 1) * 100);
          this.positiveIncoming=true;
        }
        else {
          this.percentageIncoming = Math.round((this.summeIncoming / this.refSummeIncoming - 1) * 100);
          this.positiveIncoming=false;
        }
      })

    function getSumIncoming(amount, date) {
      let refDateStart = moment(new Date()).add(-30, 'days').toDate();
      let refDateEnd = moment(new Date()).add(-60, 'days').toDate();
      var totalRef = 0;
      for (var i in amount) {

        let p = moment(date[i]);
        let x = moment(p).format('MM/DD/YYYY');

        if (x <= moment(refDateStart).format('MM/DD/YYYY') && x >= moment(refDateEnd).format('MM/DD/YYYY')) {
          console.log(x + ' ist war, mit Betrag' + amount[i]);
          totalRef += amount[i];
        }
      }
      return totalRef;
    }
    return this.refSummeIncoming;
  }




}
