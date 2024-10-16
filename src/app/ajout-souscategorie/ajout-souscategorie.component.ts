import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-ajout-souscategorie',
  templateUrl: './ajout-souscategorie.component.html',
  styleUrls: ['./ajout-souscategorie.component.css']
})
export class AjoutSouscategorieComponent {
  sousCategorieForm: FormGroup;
  categorieId: string = '';

  constructor(
    public dialogRef: MatDialogRef<AjoutSouscategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private categorieService: CategorieService
  ) {
    // Récupérer l'identifiant de la catégorie passé en données
    this.categorieId = data.categorieId;

    // Initialiser le formulaire de la sous-catégorie avec les champs requis
    this.sousCategorieForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Type: ['', Validators.required]
    });
  }

  private generateUniqueId(): string {
    // Génération d'un ID unique simple pour l'exemple (vous pouvez utiliser une bibliothèque d'ID unique plus robuste)
    return Math.random().toString(36).substr(2, 9);
  }

  // Méthode pour ajouter une nouvelle sous-catégorie à la catégorie
  ajouterSousCategorie() {
    if (this.sousCategorieForm.valid) {
      const sousCategorieData = this.sousCategorieForm.value;
      sousCategorieData.id = this.generateUniqueId();
  
      // Récupérer d'abord toutes les données de la catégorie
      this.categorieService.getCategorieById(this.categorieId).subscribe({
        next: (categorie) => {
          // Assurez-vous que la propriété 'sousCategories' existe dans les données de la catégorie
          if (!categorie.sousCategories) {
            categorie.sousCategories = [];
          }
          
          // Ajouter la nouvelle sous-catégorie à la liste des sous-catégories existantes
          categorie.sousCategories.push(sousCategorieData);
          
          // Mettre à jour la catégorie avec toutes les données
          this.categorieService.updateCategorieWithSousCategories(this.categorieId, categorie).subscribe({
            next: (updatedCategorie) => {
              console.log('Nouvelle sous-catégorie ajoutée avec succès:', updatedCategorie);
              this.dialogRef.close(true);
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour de la catégorie avec la nouvelle sous-catégorie:', err);
              // Gérer l'erreur si nécessaire
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données de la catégorie:', err);
          // Gérer l'erreur si nécessaire
        }
      });
    }
  }

  // Méthode pour fermer la boîte de dialogue sans ajouter de sous-catégorie
  annuler() {
    this.dialogRef.close();
  }
}
