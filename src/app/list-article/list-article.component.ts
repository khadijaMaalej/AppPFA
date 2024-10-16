import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AjoutArticleComponent } from '../ajout-article/ajout-article.component';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { Article } from 'src/Modeles/article';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Reference', 'Categorie', 'SousCategorie', 'Marque', 'Prix', 'Etat', 'Image', 'Action'];
  dataSource!: MatTableDataSource<Article>;
  responsableId: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private articleService: ArticleService,
    private authService: AuthService
  ) {
    this.responsableId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe({
      next: (articles) => {
        const filteredArticles = articles.filter(article => article.ResponsableId === this.responsableId);
        this.dataSource = new MatTableDataSource(filteredArticles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error('Error loading articles:', err)
    });
  }

  openAddEditArticleForm(data: any = null) {
    const dialogRef = this._dialog.open(AjoutArticleComponent, {
      data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadArticles();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategorie(id: string) {
    const article = this.dataSource.data.find(article => article.id === id);
    if (article && article.ResponsableId === this.responsableId) {
      if (confirm('Are you sure you want to delete this article?')) {
        this.articleService.deleteArticle(id).subscribe({
          next: () => this.loadArticles(),
          error: (err) => console.error('Error deleting article:', err)
        });
      }
    } else {
      alert('You do not have permission to delete this article.');
    }
  }

  openEditForm(data: any) {
    if (data.ResponsableId === this.responsableId) {
      this.openAddEditArticleForm(data);
    } else {
      alert('You do not have permission to edit this article.');
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
