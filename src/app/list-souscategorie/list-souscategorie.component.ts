import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../services/categorie.service';
import { AjoutSouscategorieComponent } from '../ajout-souscategorie/ajout-souscategorie.component';

@Component({
  selector: 'app-list-souscategorie',
  templateUrl: './list-souscategorie.component.html',
  styleUrls: ['./list-souscategorie.component.css']
})
export class ListSouscategorieComponent implements OnInit, AfterViewInit {
  sousCategories: any[] = [];
  categorieId: string | null = null;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Nom', 'Type', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.categorieId = id;
      this.fetchSousCategories();
    }
  }

  fetchSousCategories() {
    if (this.categorieId) {
      this.categorieService.getSousCategorie(this.categorieId).subscribe({
        next: (res) => {
          this.sousCategories = res && res.sousCategories ? res.sousCategories : [];
          this.dataSource.data = this.sousCategories;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des sous-catégories de la catégorie:', err);
        }
      });
    }
  }

  openAddEditSousCategorieForm() {
    const dialogRef = this.dialog.open(AjoutSouscategorieComponent, {
      width: '400px',
      data: { categorieId: this.categorieId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchSousCategories();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditForm(sousCategorie: any) {
   // this.openAddEditSousCategorieForm(sousCategorie);
  }

  deleteSousCategorie(categorieId: string, sousCategorieId: string) {
    this.categorieService.deleteSousCategorie(categorieId, sousCategorieId).subscribe({
      next: () => {
        console.log('Sous-catégorie supprimée avec succès.');
        this.fetchSousCategories();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la sous-catégorie:', err);
      }
    });
  }
}

