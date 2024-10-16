import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-chart',
  templateUrl: './article-chart.component.html',
  styleUrls: ['./article-chart.component.css']
})
export class ArticleChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset<'bar'>[] = [
    { data: [], label: 'Articles' }
  ];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => {
      const articleCountByMarque = articles.reduce((acc: any, article: any) => {
        acc[article.Marque] = (acc[article.Marque] || 0) + 1;
        return acc;
      }, {});

      this.barChartLabels = Object.keys(articleCountByMarque);
      this.barChartData = [
        { data: Object.values(articleCountByMarque), label: 'Articles' }
      ];
    });
  }
}
