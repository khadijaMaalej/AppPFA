import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { UserService } from '../services/user.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  categoryCount: number = 0;
  userCount: number = 0;
  articleCount: number = 0;
  showUserChart: boolean = false;
  showArticleChart: boolean = false;
  showCategorieChart: boolean = false;

  constructor(
    private categorieService: CategorieService,
    private userService: UserService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.categorieService.getCategorieList().subscribe({
      next: (categories) => this.categoryCount = categories.length,
      error: (err) => console.error('Error fetching category list:', err)
    });

    this.userService.getUserList().subscribe({
      next: (users: any[]) => this.userCount = users.length,
      error: (err: any) => console.error('Error fetching user list:', err)
    });

    this.articleService.getArticles().subscribe({
      next: (articles) => this.articleCount = articles.length,
      error: (err) => console.error('Error fetching articles:', err)
    });
  }

  toggleUserChart(): void {
    this.showUserChart = !this.showUserChart;
  }

  toggleArticleChart(): void {
    this.showArticleChart = !this.showArticleChart;
  }

  toggleCategorieChart(): void {
    this.showCategorieChart = !this.showCategorieChart;
  }
}
