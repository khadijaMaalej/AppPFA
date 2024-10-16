import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/Modeles/article';
import { ArticleService } from '../services/article.service';
import { CategorieService } from '../services/categorie.service';
import { MarqueService } from '../services/marque.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-article-refuser',
  templateUrl: './article-refuser.component.html',
  styleUrls: ['./article-refuser.component.css']
})
export class ArticleRefuserComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Reference', 'Categorie', 'SousCategorie', 'Marque', 'Prix', 'Etat', 'Image'];
  dataSource!: MatTableDataSource<Article>;

  categories: any[] = [];
  subCategories: any[] = [];
  marques: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private articleService: ArticleService,
    private categorieService: CategorieService,
    private marqueService: MarqueService
  ) {}

  ngOnInit(): void {
    this.loadRejectedArticles();
  }

  loadRejectedArticles() {
    forkJoin({
      articles: this.articleService.getArticles(),
      categories: this.categorieService.getCategorieList(),
      subCategories: this.categorieService.getCategorieList(), // Si les sous-catégories viennent des catégories
      marques: this.marqueService.getMarques()
    }).subscribe({
      next: ({ articles, categories, subCategories, marques }) => {
        console.log('Categories:', categories);
        console.log('SubCategories:', subCategories);
        console.log('Marques:', marques);

        this.categories = categories;
        this.subCategories = subCategories.flatMap(cat => cat.sousCategories); // Assurez-vous d'extraire les sous-catégories de chaque catégorie
        this.marques = marques;

        const rejectedArticles = articles.filter(article => article.Etat === 'Refusé');
        this.mapArticleProperties(rejectedArticles);
        console.log('Mapped Articles:', rejectedArticles);
        this.dataSource = new MatTableDataSource(rejectedArticles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
