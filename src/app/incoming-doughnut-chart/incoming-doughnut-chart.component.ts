import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { WebserviceService } from '@app/_services/webservice.service';


@Component({
  selector: 'app-incoming-doughnut-chart',
  templateUrl: './incoming-doughnut-chart.component.html',
  styleUrls: ['./incoming-doughnut-chart.component.css']
})

export class IncomingDoughnutChartComponent implements OnInit{

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];
  doughnutChartType: ChartType = 'doughnut';

  data= [];
  label:Label[]=[];
  ngOnInit() {
    this.getAllIncomingCategories();
  }
  constructor(private services: WebserviceService) { }

  public getAllIncomingCategories(){
    this.services.getIncomingCategories()
      .then(cat => {
        var _id = cat.map(c => _id = c._id);
        var amount = cat.map(a => amount = (a.amount));
        for(var i in _id){
          this.label.push(_id[i]);
        }
        for(var i in amount){
          this.data.push(amount[i]);
        }
  })
}

public chartColors: any[] = [
  { 
    backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"] 
  }];
}