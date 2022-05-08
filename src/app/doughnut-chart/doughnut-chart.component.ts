import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { WebserviceService } from '@app/_services/webservice.service';


@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {

  doughnutChartLabels: Label[] = ['Essen'];
  doughnutChartData: MultiDataSet = [
    []
  ];
  doughnutChartType: ChartType = 'doughnut';

  data = [];
  label: Label[] = [];
  ngOnInit() {
    this.getAllCategories();
  }
  constructor(private services: WebserviceService) { }

  public getAllCategories() {
    this.services.getCategories()
      .then(cat => {
        var _id = cat.map(c => _id = c._id);
        var amount = cat.map(a => amount = (a.amount));
        for (var i in _id) {
          this.label.push(_id[i]);
        }
        for (var i in amount) {
          this.data.push(amount[i]);
        }
      })
  }

  public chartColors: any[] = [
    {
      backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];
}