import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Article } from 'src/Modeles/article';
import { Categorie } from 'src/Modeles/categorie';
import { Marque } from 'src/Modeles/marque';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`);
  }

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`);
  }

  getMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(`${this.apiUrl}/marques`);
  }
 
   
  
    getArticleById(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/articles/${id}`);
    }
  
    addArticle(article: Article): Observable<Article> {
      return this.http.post<Article>(`${this.apiUrl}/articles`, article);
    }
  
    updateArticle(id: string, article: Article): Observable<Article> {
      return this.http.put<Article>(`${this.apiUrl}/articles/${id}`, article);
    }
  
    deleteArticle(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/articles/${id}`);
    }
  
   
  




  getArticlesByMarqueId(marqueId: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles`).pipe(
      map(articles => articles.filter(article => article.Marque === marqueId))
    );
  }

 


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getArticlesByReference(reference: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles?reference=${reference}`);
  }


  getArticlesByReferenceAndBrand(reference: string, marqueId: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles?reference=${reference}&marqueId=${marqueId}`);
  }

  
}