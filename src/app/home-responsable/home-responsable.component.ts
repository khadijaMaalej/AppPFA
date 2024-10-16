import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { MarqueService } from '../services/marque.service';
import { MessageComponent } from '../message/message.component'; // Importez le composant MessageComponent

@Component({
  selector: 'app-home-responsable',
  templateUrl: './home-responsable.component.html',
  styleUrls: ['./home-responsable.component.css', '../../assets/responsable/css/bootsnav.css', '../../assets/responsable/css/bootstrap.min.css', '../../assets/responsable/css/owl.theme.default.min.css', '../../assets/responsable/css/linearicons.css']
})
export class HomeResponsableComponent implements OnInit {
  isChatOpen = false;
  categories: any[] = []; // Propriété pour stocker les catégories
  marques: any[] = []; // Propriété pour stocker les marques

  constructor(
    private _categorieService: CategorieService, 
    private _marqueService: MarqueService, 
    private authService: AuthService, 
    private router: Router, 
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog // Injectez MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openChat(event: Event) {
    event.preventDefault();
    this.openDialog(); // Ouvrez le dialogue lorsque le bouton est cliqué
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '400px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

 


}
