import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WebserviceService } from '@app/_services/webservice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  puffer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  incomingPuffer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  last12Month: number[] = [];
  used12Month = [];
  liste: ChartDataSets[] = [];
  label: Label[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: this.puffer, label: 'Ausgaben' },
    { data: this.incomingPuffer, label: 'Einnahmen' },
  ];

  public lineChartLabels: Label[] = this.label;

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private services: WebserviceService) { }

  getLast12Month() {
    var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var d = new Date(new Date().setMonth(new Date().getMonth() - 12));
    for (let i = 12; i >= 0; i--) {
      this.label.push(monthName[d.getMonth()] + ' ' + d.getFullYear());
      d.setMonth(d.getMonth() + 1);
    }
  }

  ngOnInit() {
    this.getLast12Month();
    setTimeout(() => this.getSalariesByMonth(), 500);
    setTimeout(() => this.getInvoicesByMonth(), 500);
  }


  getInvoicesByMonth() {
    this.services.getInvoicesByMonth()
      .then(cat => {
        var _id = cat.map(_id => _id = (_id._id));
        var amount = cat.map(a => amount = (a.amount));
        var month = _id.map(m => month = (m.month));
        var year = _id.map(y => year = (y.year));
        var dict = {
          value: {
            month: "",
            year: "",
            amount: ""
          }
        };
        dict.value.amount

        for (var i in month) {
          this.used12Month.push(month[i]);
        }

        for (var i in month) {
          var d = new Date();
          var index = 0;
          var currentMonth = (d.getMonth() + 1);
          var currentYear = (d.getFullYear());
          if (month[i] > currentMonth) {
            index = 12 - currentMonth - (12 - month[i]);
          }
          else if (month[i] == currentMonth && year[i] != currentYear) {
            index = 0;
          }
          else {
            index = 12 - (currentMonth - month[i]);
          }
          this.puffer.splice(index, 1, amount[i]);
        }
      })
  }

  getSalariesByMonth() {
    this.services.getSalariesByMonth()
      .then(cat => {
        var _id = cat.map(_id => _id = (_id._id));
        var amount = cat.map(a => amount = (a.amount));
        var month = _id.map(m => month = (m.month));
        var year = _id.map(y => year = (y.year));

        var dict = {
          value: {
            month: "",
            year: "",
            amount: ""
          }
        };
        dict.value.amount

        for (var i in month) {
          this.used12Month.push(month[i]);
        }
        for (var i in month) {
          var d = new Date();
          var index = 0;
          var currentMonth = (d.getMonth() + 1);
          var currentYear = (d.getFullYear());

          if (month[i] > currentMonth) {
            index = 12 - currentMonth - (12 - month[i]);
          }
          else if (month[i] == currentMonth && year[i] != currentYear) {
            index = 0;
          }
          else {
            index = 12 - (currentMonth - month[i]);
          }
          this.incomingPuffer.splice(index, 1, amount[i]);
        }
      })
  }
}