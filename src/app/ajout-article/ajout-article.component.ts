import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Categorie, SousCategorie } from 'src/Modeles/categorie';
import { Marque } from 'src/Modeles/marque';
import { Article } from 'src/Modeles/article';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.css']
})
export class AjoutArticleComponent implements OnInit {
  articleForm!: FormGroup;
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  marques: Marque[] = [];
  filteredSousCategories: SousCategorie[] = [];
  filteredMarques: Marque[] = [];
  responsableId: string;
  imageUrl: string | null = null;
  selectedFile: File | null = null;
  cloudinaryUploadPreset = 'ramzira'; // Remplacez par votre upload_preset Cloudinary

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AjoutArticleComponent>,
    private articleService: ArticleService,
    private authService: AuthService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) {
    this.responsableId = this.authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      Nom: [this.data ? this.data.Nom : '', Validators.required],
      Reference: [this.data ? this.data.Reference : '', Validators.required],
      Categorie: [this.data ? this.data.Categorie : '', Validators.required],
      SousCategorie: [this.data ? this.data.SousCategorie : '', Validators.required],
      Marque: [this.data ? this.data.Marque : '', Validators.required],
      Prix: [this.data ? this.data.Prix : '', Validators.required],
      ImageUrl: [this.data ? this.data.ImageUrl : ''],
      Etat: [this.data ? this.data.Etat : 'En attente'],
      Lien: [this.data ? this.data.Lien : '']  // Nouveau champ "lien"
    });
  
    this.loadCategories();
    this.loadMarques();
  
    this.articleForm.get('Categorie')?.valueChanges.subscribe(value => {
      this.filteredSousCategories = this.sousCategories.filter(sc => sc.Categorie === value);
      this.articleForm.get('SousCategorie')?.setValue('');
      this.filteredMarques = [];
      this.articleForm.get('Marque')?.setValue('');
    });
  
    this.articleForm.get('SousCategorie')?.valueChanges.subscribe(value => {
      this.filteredMarques = this.marques.filter(m => m.SousCategorie === value);
      this.articleForm.get('Marque')?.setValue('');
    });
  }
  

   

  loadCategories() {
    this.articleService.getCategories().subscribe((categories: Categorie[]) => {
      this.categories = categories;
      this.sousCategories = categories.flatMap((c: Categorie) => 
        Array.isArray(c.sousCategories) ? c.sousCategories.map((sc: SousCategorie) => ({ ...sc, Categorie: c.id })) : []
      );
    });
  }

  loadMarques() {
    this.articleService.getMarques().subscribe((marques: Marque[]) => {
      this.marques = marques;
    });
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    return this.http.post<any>(`https://api.cloudinary.com/v1_1/dcwqj5lsu/image/upload`, formData)
      .toPromise()
      .then(response => response.secure_url)
      .catch(err => {
        console.error('Error uploading image:', err);
        return '';
      });
  }

  async onFormSubmit() {
    if (this.articleForm.valid) {
      let imageUrl = this.articleForm.value.ImageUrl;
  
      if (this.selectedFile) {
        imageUrl = await this.uploadImage(this.selectedFile);
      }
  
      if (this.data) {
        const updatedArticle: Article = {
          ...this.articleForm.value,
          id: this.data.id,
          ResponsableId: this.data.ResponsableId,
          approved: this.data.approved,
          ImageUrl: imageUrl,
          Lien: this.articleForm.value.Lien  // Inclure le champ "lien"
        };
        this.articleService.updateArticle(this.data.id, updatedArticle).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating article:', err)
        });
      } else {
        const newArticle: Article = {
          ...this.articleForm.value,
          id: new Date().getTime().toString(),
          ResponsableId: this.responsableId,
          approved: false,
          ImageUrl: imageUrl,
          Lien: this.articleForm.value.Lien  // Inclure le champ "lien"
        };
        this.articleService.addArticle(newArticle).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error adding article:', err)
        });
      }
    }
  }
  

  close() {
    this.dialogRef.close();
  }
}
