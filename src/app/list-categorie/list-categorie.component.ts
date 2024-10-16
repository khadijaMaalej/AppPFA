import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AjoutCategorieComponent } from '../ajout-categorie/ajout-categorie.component';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {
  title = 'crud';
  displayedColumns: string[] = ['Nom', 'Slogan', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategorieList();
  }

  openAddEditCategorieForm() {
    const dialogRef = this._dialog.open(AjoutCategorieComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategorieList();
        }
      }
    });
  }

  getCategorieList() {
    this._categorieService.getCategorieList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategorie(id: number) {
    this._categorieService.deleteCategorie(id).subscribe({
      next: (res) => {
        this.getCategorieList();
      },
      error: console.error,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AjoutCategorieComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCategorieList();
        }
      },
    });
  }

  openSousCatList(categorieId: string) {
    this._categorieService.getSousCategorie(categorieId).subscribe({
      next: (res) => {
        this.router.navigate(['/categorie', categorieId], { state: { sousCategories: res } });
      },
      error: console.error,
    });
  }
}
