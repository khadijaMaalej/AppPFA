import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categorie } from 'src/Modeles/categorie';
import { CategorieService } from '../services/categorie.service';
import { MarqueService } from '../services/marque.service';
import { AuthService } from '../services/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-cat-resp',
  templateUrl: './cat-resp.component.html',
  styleUrls: ['./cat-resp.component.css']
})
export class CatRespComponent  implements OnInit {
  categories: Categorie[] = []; // Propriété pour stocker les catégories

  constructor(
    private _categorieService: CategorieService, 
   
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCategorieList();
  }

 

  

  getCategorieList() {
    this._categorieService.getCategorieList().subscribe({
      next: (data) => {
        console.log('Catégories récupérées:', data); // Log pour vérifier les données
        this.categories = data;
        this.cdr.detectChanges(); // Déclenche le changement pour mettre à jour la vue
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });
  }

 
}
