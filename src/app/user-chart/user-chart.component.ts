import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Users'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset<'bar'>[] = [
    { data: [], label: 'Approved' },
    { data: [], label: 'Rejected' }
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      const approved = users.filter(user => user.status === 'approved').length;
      const rejected = users.filter(user => user.status === 'rejected').length;

      this.barChartData = [
        { data: [approved], label: 'Approved' },
        { data: [rejected], label: 'Rejected' }
      ];
    });
  }
}
