import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarqueService } from '../services/marque.service';
import { AjoutMarqueComponent } from '../ajout-marque/ajout-marque.component';

@Component({
  selector: 'app-list-marque',
  templateUrl: './list-marque.component.html',
  styleUrls: ['./list-marque.component.css']
})
export class ListMarqueComponent implements OnInit {
  marques: any[] = [];
  sousCategorieId: string | null = null;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Nom', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private marqueService: MarqueService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sousCategorieId = this.route.snapshot.paramMap.get('id');
    if (this.sousCategorieId) {
      this.fetchMarques();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  fetchMarques() {
    if (this.sousCategorieId) {
      this.marqueService.getMarquesBySousCategorieId(this.sousCategorieId).subscribe({
        next: (res) => {
          this.marques = res;
          this.dataSource.data = this.marques;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des marques:', err);
        }
      });
    }
  }

  openAddMarqueForm() {
    const dialogRef = this.dialog.open(AjoutMarqueComponent, {
      width: '400px',
      data: { sousCategorieId: this.sousCategorieId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchMarques();
      }
    });
  }

  deleteMarque(marqueId: string) {
    this.marqueService.deleteMarque(marqueId).subscribe({
      next: () => {
        this.fetchMarques();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la marque:', err);
      }
    });
  }
}
