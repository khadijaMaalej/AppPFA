import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {
  categorieForm: FormGroup;


  constructor(private _fb: FormBuilder, 
   private _categorieService: CategorieService, 
    private _dialogRef: MatDialogRef<AjoutCategorieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
    this.categorieForm = this._fb.group({
      Nom: '',
      Slogan:'',
    });
  }
  ngOnInit(): void {
      this.categorieForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.categorieForm.valid) {
      if(this.data) {
        this._categorieService.updateCategorie(this.data.id, this.categorieForm.value).subscribe({
          next:(val:any) =>{
           // alert('Categorie modifier avec succès');
            this._dialogRef.close(true);

          },
          error: (err:any) => {
            console.error(err);
          },
        });
      }
      else{
         this._categorieService.addCategorie(this.categorieForm.value).subscribe({
           next:(val:any) =>{
          alert('Catégorie ajoutée avec succès');
            this._dialogRef.close(true);
   },
   error: (err: any) => {
   console.error(err);
   },
   });
  console.log(this.categorieForm.value);
}
}
 }
}
