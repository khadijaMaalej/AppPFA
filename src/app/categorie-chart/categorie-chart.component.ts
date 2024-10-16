import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { ChartOptions, ChartType, ChartData, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-categorie-chart',
  templateUrl: './categorie-chart.component.html',
  styleUrls: ['./categorie-chart.component.css']
})
export class CategorieChartComponent implements OnInit {
  categories: any[] = [];
  categoryNames: string[] = [];
  categoryCounts: number[] = [];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar'; // Set the type explicitly
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Nombre de sous-catégories',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
      }
    ]
  };

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.categorieService.getCategorieList().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryNames = categories.map(category => category.Nom);
        this.categoryCounts = categories.map(category => category.sousCategories?.length || 0);
        this.updateChartData();
      },
      error: (err) => console.error('Error fetching category list:', err)
    });
  }

  updateChartData(): void {
    this.barChartData.labels = this.categoryNames;
    this.barChartData.datasets[0].data = this.categoryCounts;
  }
}
