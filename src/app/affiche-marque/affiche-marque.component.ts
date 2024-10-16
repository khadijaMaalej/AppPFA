import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategorieService } from '../services/categorie.service';
import { AddMarqueComponent } from '../add-marque/add-marque.component';

@Component({
  selector: 'app-affiche-marque',
  templateUrl: './affiche-marque.component.html',
  styleUrls: ['./affiche-marque.component.css']
})
export class AfficheMarqueComponent implements OnInit {
  displayedColumns: string[] = ['Nom', 'Categorie', 'SousCategorie', 'Action'];
  dataSource!: MatTableDataSource<any>;

  categories: any[] = [];
  sousCategories: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categorieService: CategorieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategoriesAndSousCategories();
    this.fetchMarques();
  }

  loadCategoriesAndSousCategories() {
    this.categorieService.getCategorieList().subscribe(data => {
      this.categories = data;
    });

    this.categorieService.getCategorieList().subscribe(data => {
      this.sousCategories = data.reduce((acc, cat) => acc.concat(cat.sousCategories || []), []);
    });
  }

  fetchMarques() {
    this.categorieService.getMarques().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAddEditMarqueForm() {
    const dialogRef = this.dialog.open(AddMarqueComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMarques();
      }
    });
  }

  editMarque(marque: any) {
    const dialogRef = this.dialog.open(AddMarqueComponent, {
      data: marque
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchMarques();
      }
    });
  }

  deleteMarque(id: string) {
    this.categorieService.deleteMarque(id).subscribe(() => {
      this.fetchMarques();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCategorieName(id: string): string {
    const categorie = this.categories.find(cat => cat.id === id);
    return categorie ? categorie.Nom : 'N/A';
  }

  getSousCategorieName(id: string): string {
    const sousCategorie = this.sousCategories.find(sub => sub.id === id);
    return sousCategorie ? sousCategorie.Nom : 'N/A';
  }
}
