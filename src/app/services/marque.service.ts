import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marque } from 'src/Modeles/marque';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }
  getMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(`${this.baseUrl}/marques`);
  }
  getMarquesBySousCategorieId(sousCategorieId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/souscategories/${sousCategorieId}/marques`);
  }

  getMarquesBySousCategorieId1(sousCategorieId: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/marques`).pipe(
      map(marques => marques.filter(marque => marque.SousCategorie === sousCategorieId))
    );
  }

  addMarque(sousCategorieId: string, marque: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/souscategories/${sousCategorieId}/marques`, marque);
  }

  deleteMarque(marqueId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/marques/${marqueId}`);
  }

  getArticlesByMarqueId(marqueId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/articles`).pipe(
      map(articles => articles.filter(article => article.Marque === marqueId))
    );
  }
}
