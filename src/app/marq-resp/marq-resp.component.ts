import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Marque } from 'src/Modeles/marque';
import { MarqueService } from '../services/marque.service';

@Component({
  selector: 'app-marq-resp',
  templateUrl: './marq-resp.component.html',
  styleUrls: ['./marq-resp.component.css']
})
export class MarqRespComponent implements OnInit {
  marques: Marque[] = []; // Propriété pour stocker les marques

  constructor(
    private _marqueService: MarqueService, 
 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMarqueList();
  }

  
 

  getMarqueList() {
    this._marqueService.getMarques().subscribe({
      next: (data) => {
        console.log('Marques récupérées:', data); // Log pour vérifier les données
        this.marques = data;
        this.cdr.detectChanges(); // Déclenche le changement pour mettre à jour la vue
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des marques:', err);
      }
    });
  }
}
