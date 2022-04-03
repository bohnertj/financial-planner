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
  show: boolean = true;
  summe = 0;
  refSumme=0;
  test = 50;
  percentage=0
  ngOnInit() {
    let n=this.getAllIncoming();
    let x=this.getRefSumme();
  
  }

  public roundPercentage(){
    console.log('Summe: '+ this.summe);
    console.log('Ref Summe: '+ this.refSumme);
    
    this.percentage=Math.round((this.summe/this.refSumme-1)*100);
    console.log('Perc: '+ this.percentage);
  }

  public getAllIncoming() {
    this.services.getUsers()
      .then(users => {
        var amount = users.map(u => amount = parseInt(u.amount));
        var date = users.map(d => d = (d.date));
        this.summe = getSum(amount, date);
      })

    function getSum(amount, date) {
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
    return this.summe;
  }

  public getRefSumme() {
    this.services.getUsers()
    .then(users => {
      var amount = users.map(u => amount = parseInt(u.amount));
      var date = users.map(d => d = (d.date));
      this.refSumme = getSum(amount, date);
      this.percentage= Math.round((this.summe/this.refSumme-1)*100);
    })

  function getSum(amount, date) {
    let refDateStart = moment(new Date()).add(-30, 'days').toDate();
    let refDateEnd = moment(new Date()).add(-60, 'days').toDate();
    var totalRef = 0;
    for (var i in amount) {
     
      let p=moment(date[i]);
      let x = moment(p).format('MM/DD/YYYY');

      console.log('Das Datum  '+x+' muss zwischen' +moment(refDateStart).format('MM/DD/YYYY')+ ' und '+moment(refDateEnd).format('MM/DD/YYYY')+ ' sein')
      if(x<=moment(refDateStart).format('MM/DD/YYYY') && x>= moment(refDateEnd).format('MM/DD/YYYY')) {
        console.log(x+' ist war, mit Betrag' + amount[i]);
        totalRef += amount[i];
      }
    }
    return totalRef;
  }
  return this.refSumme;
  }

}
