import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { MarqueService } from '../services/marque.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-categorie-client',
  templateUrl: './categorie-client.component.html',
  styleUrls: ['./categorie-client.component.css', '../../assets/lib/slick/slick.css', '../../assets/lib/slick/slick-theme.css']
})
export class CategorieClientComponent implements OnInit {
  categories: any[] = [];
  marques: { [key: string]: any[] } = {};
  articles: { [key: string]: any[] } = {};
  expandedCategoryId: string | null = null;
  expandedSubCategoryId: string | null = null;
  expandedMarqueId: string | null = null;
  users: any[] = [];

  constructor(
    private categorieService: CategorieService,
    private marqueService: MarqueService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categorieService.getCategorieList().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });

    this.articleService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  toggleSubcategories(categoryId: string): void {
    this.expandedCategoryId = this.expandedCategoryId === categoryId ? null : categoryId;
    this.expandedSubCategoryId = null; // Close subcategories if another category is expanded
  }

  toggleMarques(subCategoryId: string): void {
    this.expandedSubCategoryId = this.expandedSubCategoryId === subCategoryId ? null : subCategoryId;
    if (!this.marques[subCategoryId]) {
      this.marqueService.getMarquesBySousCategorieId1(subCategoryId).subscribe({
        next: (data) => {
          this.marques[subCategoryId] = data;
        },
        error: (err) => console.error('Error fetching marques:', err)
      });
    }
  }

  toggleArticles(marqueId: string): void {
    this.expandedMarqueId = this.expandedMarqueId === marqueId ? null : marqueId;
    if (!this.articles[marqueId]) {
      this.articleService.getArticlesByMarqueId(marqueId).subscribe({
        next: (data) => {
          // Filter only approved articles
          this.articles[marqueId] = data.filter(article => article.approved);
        },
        error: (err) => console.error('Error fetching articles:', err)
      });
    }
  }

  viewArticleDetail(articleId: string): void {
    // Use the router to navigate to the same route with the new article ID
    this.router.navigate(['/article', articleId]).then(() => {
      window.location.reload();
    });
  }

  getMagasinName(responsableId: string): string {
    const user = this.users.find(u => u.id === responsableId);
    return user ? user.magasin : 'N/A';
  }
}
