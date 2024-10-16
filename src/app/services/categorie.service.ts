import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:3001/categories';
  private marqueUrl = 'http://localhost:3001/marques';

  constructor(private _http: HttpClient) {}

  addCategorie(data: any): Observable<any> {
    return this._http.post(this.baseUrl, data);
  }

  updateCategorie(id: string, categorieData: any): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${id}`).pipe(
      switchMap((categorie) => {
        const updatedCategorie = { ...categorie, ...categorieData };
        return this._http.put(`${this.baseUrl}/${id}`, updatedCategorie);
      })
    );
  }

  getCategorieList(): Observable<any[]> {
    return this._http.get<any[]>(this.baseUrl);
  }

  deleteCategorie(id: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${id}`);
  }

  getSousCategorie(categorieId: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${categorieId}`);
  }

  getCategorieById(id: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateCategorieWithSousCategories(id: string, catData: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${id}`, catData);
  }

  addMarque(data: any): Observable<any> {
    return this._http.post(this.marqueUrl, data);
  }

  getMarques(): Observable<any> {
    return this._http.get(this.marqueUrl);
  }

  deleteMarque(id: string): Observable<any> {
    return this._http.delete(`${this.marqueUrl}/${id}`);
  }

  addSousCategorie(categorieId: string, data: any): Observable<any> {
    return this._http.post(`${this.baseUrl}/${categorieId}/sous-categorie`, data);
  }

  updateSousCategorie(categorieId: string, sousCategorieId: string, data: any): Observable<any> {
    return this._http.put(`${this.baseUrl}/${categorieId}/sous-categorie/${sousCategorieId}`, data);
  }

  deleteSousCategorie(categorieId: string, sousCategorieId: string): Observable<any> {
    return this._http.delete(`${this.baseUrl}/${categorieId}/sous-categorie/${sousCategorieId}`);
  }

  getCategorieCount(): Observable<number> {
    return this._http.get<number>(`${this.baseUrl}/count`);
  }
}
