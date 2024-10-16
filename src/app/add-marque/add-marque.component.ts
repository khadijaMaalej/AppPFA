import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.css']
})
export class AddMarqueComponent implements OnInit {
  marqueForm: FormGroup;
  categories: any[] = [];
  sousCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService,
    private dialogRef: MatDialogRef<AddMarqueComponent>
  ) {
    this.marqueForm = this.fb.group({
      Nom: ['', Validators.required],
      Categorie: ['', Validators.required],
      SousCategorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categorieService.getCategorieList().subscribe({
      next: data => {
        console.log('Catégories récupérées:', data);
        this.categories = data || [];
        console.log('Catégories assignées:', this.categories);
      },
      error: err => {
        console.error('Erreur lors de la récupération des catégories:', err);
      }
    });

    this.marqueForm.get('Categorie')?.valueChanges.subscribe(categorieId => {
      if (categorieId) {
        const selectedCategorie = this.categories.find(cat => cat.id === categorieId);
        this.sousCategories = selectedCategorie ? selectedCategorie.sousCategories : [];
        console.log('Sous-catégories assignées:', this.sousCategories);
      } else {
        this.sousCategories = [];
      }
    });
  }

  onSubmit(): void {
    if (this.marqueForm.valid) {
      this.categorieService.addMarque(this.marqueForm.value).subscribe({
        next: res => {
          console.log('Marque ajoutée avec succès:', res);
          this.dialogRef.close(true);
        },
        error: err => {
          console.error('Erreur lors de l\'ajout de la marque:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
