import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from 'src/Modeles/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article = {
    id: '',
    Nom: '',
    Reference: '',
    Categorie: '',
    SousCategorie: '',
    Marque: '',
    Prix: 0,
    ResponsableId: '',
    approved: false,
    Etat: '',
    ImageUrl: '',
    Lien: '',
    Description: '' // Assurez-vous d'inclure toutes les propriétés requises ici
  };
  users: any[] = [];
  relatedArticles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(articleId).subscribe({
        next: (data) => {
          this.article = data;
          this.fetchRelatedArticles(data.Reference); // Assurez-vous d'utiliser la propriété correcte
        },
        error: (err) => console.error('Error fetching article:', err)
      });
    }

    // Fetch users to display responsible names
    this.articleService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  fetchRelatedArticles(reference: string): void {
    this.articleService.getArticlesByReference(reference).subscribe({
      next: (data) => {
        // Filtrer les articles par référence et trier par prix croissant
        this.relatedArticles = data
          .filter(article => article.Reference === reference && article.approved === true)
          .sort((a, b) => a.Prix - b.Prix);
      },
      error: (err) => console.error('Error fetching related articles:', err)
    });
  }

  viewArticleDetail(articleId: string): void {
    this.router.navigate(['/article', articleId]);
  }

  getMagasinName(responsableId: string): string {
    const user = this.users.find(u => u.id === responsableId);
    return user ? user.magasin : 'N/A';
  }
}
