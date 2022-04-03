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
  puffer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  einnahmen = [1500, 900, 3000, 2000, 2300, 1000, 800, 1550, 700, 1700, 2500, 2000];
  last12Month: number[] = [];
  used12Month = [];
  liste: ChartDataSets[] = [];
  label: Label[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: this.puffer, label: 'Ausgaben' },
    { data: this.einnahmen, label: 'Einnahmen' },
  ];

  public lineChartLabels: Label[] = this.label;
  //public lineChartOptions: (ChartOptions & { annotation: any }) = {responsive: true,};

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
    this.getInvoicesByMonth();

    this.getLast12Month();
    //  this.compareArray(this.used12Month);
    //this.liste.push({ data: [this.puffer], label: 'Einnahmen' });
  }


  getInvoicesByMonth() {
    this.services.getInvoicesByMonth()
      .then(cat => {
        var _id = cat.map(_id => _id = (_id._id));
        var amount = cat.map(a => amount = (a.amount));
        var month = _id.map(m => month = (m.month));
        var year = _id.map(y => year = (y.year));
        var a1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        for (var i in amount) {
          console.log("Zeig mir jeden Betrag: " + amount[i]);
        }

        //var dict = new Object();
        var dict = {
          value: {
            month: "",
            year: "",
            amount: ""
          }
        };
        dict.value.amount
        for (let i = 0; i <= 11; i++) {

        }

        for (var i in month) {
          console.log("Monatss: " + month[i])
          this.used12Month.push(month[i]);
          //let missing = a1.filter(item => this.used12Month.indexOf(item) < 0);
          // console.log('DAS FEHLT IM ARRAY ' + missing); // ["e", "f", "g"]
        }


        // console.log('DAS FEHLT ' + missing); // ["e", "f", "g"]

        //for (var s in amount) {
        // let hit = a1.filter(item => this.used12Month.indexOf(item) > -1);
        for (var i in month) {
          console.log('DIESE MONATE GIBTS: ' + month[i]);
          var d = new Date();
          // JAN= 
          var index = 0;
          var currentMonth = (d.getMonth() + 1); //4
          var currentYear = (d.getFullYear());
          console.log("Aktuelles Jahr: "+ currentYear);
          //Jahr muss noch berücksichtigt werden für einen Monat
          if (month[i] > currentMonth) { // 2  4
            index = 12 - currentMonth - (12 - month[i]);
            //console.log("Index:"+ index + "Hit: "+ month[i] + "Amount: "+ amount[i])
          }
          else if (month[i] == currentMonth && year[i] != currentYear) {
            index = 0;
          }
          else {
            index = 12 - (currentMonth - month[i]); // 12 - (4 - 2) = 10
            //console.log("Index:"+ index + "Hit: "+ month[i] + "Amount: "+ amount[i]) // 10 2 140
          }

          console.log("Index:" + index + "Amount: " + amount[i]) // 10 2 140

          this.puffer.splice(index, 1, amount[i]); // Januar


        }

        this.einnahmen.splice(0, 0, 2500);

        // console.log("BETRAG: " + amount[i] + "bei Monat " +hit[i] )
        // console.log("Das Fehlt nicht " + hit[i])
        // this.puffer.push(amount[i]);
        //this.puffer.splice(hit[i],0,amount[i] );         
        //   }




        console.log("Methode wird aufgrufen");
        console.log("ddd" + this.puffer.length);
        this.puffer.forEach((x, i) => console.log('Puffer Array: ' + x));

      })
  }



}