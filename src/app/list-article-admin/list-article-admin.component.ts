import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/Modeles/article';
import { ArticleService } from '../services/article.service';
import { CategorieService } from '../services/categorie.service';
import { MarqueService } from '../services/marque.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-article-admin',
  templateUrl: './list-article-admin.component.html',
  styleUrls: ['./list-article-admin.component.css']
})
export class ListArticleAdminComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Reference', 'Categorie', 'SousCategorie', 'Marque', 'Prix', 'Etat', 'Image', 'Action'];
  dataSource!: MatTableDataSource<Article>;

  categories: any[] = [];
  subCategories: any[] = [];
  marques: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private marqueService: MarqueService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    forkJoin({
      articles: this.articleService.getArticles(),
      categories: this.articleService.getCategories(),
      subCategories: this.categorieService.getCategorieList(),
      marques: this.marqueService.getMarques()
    }).subscribe({
      next: ({ articles, categories, subCategories, marques }) => {
        this.categories = categories;
        this.subCategories = subCategories.flatMap(cat => cat.sousCategories); // Extraction des sous-catégories
        this.marques = marques;

        const pendingArticles = articles.filter(article => article.Etat === 'En attente');
        this.mapArticleProperties(pendingArticles);
        this.dataSource = new MatTableDataSource(pendingArticles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sort.sort({ id: 'Nom', start: 'asc', disableClear: true });
      },
      error: (err) => console.error('Error loading data:', err)
    });
  }

  mapArticleProperties(articles: Article[]) {
    articles.forEach(article => {
      article.Categorie = this.categories.find(cat => cat.id === article.Categorie)?.Nom || article.Categorie;
      article.SousCategorie = this.subCategories.find(subCat => subCat.id === article.SousCategorie)?.Nom || article.SousCategorie;
      article.Marque = this.marques.find(marque => marque.id === article.Marque)?.Nom || article.Marque;
    });
  }

  approveArticle(id: string) {
    const article = this.dataSource.data.find(article => article.id === id);
    if (article) {
      article.Etat = 'Accepté';
      this.articleService.updateArticle(id, article).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Error approving article:', err)
      });
    }
  }

  rejectArticle(id: string) {
    const article = this.dataSource.data.find(article => article.id === id);
    if (article) {
      article.Etat = 'Refusé';
      this.articleService.updateArticle(id, article).subscribe({
        next: () => this.loadData(),
        error: (err) => console.error('Error rejecting article:', err)
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
