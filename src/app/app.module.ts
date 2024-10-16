
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';
import { ListSouscategorieComponent } from './list-souscategorie/list-souscategorie.component';
import { AjoutSouscategorieComponent } from './ajout-souscategorie/ajout-souscategorie.component';
import { ListMarqueComponent } from './list-marque/list-marque.component';
import { AddMarqueComponent } from './add-marque/add-marque.component';
import { AfficheMarqueComponent } from './affiche-marque/affiche-marque.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeResponsableComponent } from './home-responsable/home-responsable.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { AjoutArticleComponent } from './ajout-article/ajout-article.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { ListArticleAdminComponent } from './list-article-admin/list-article-admin.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { VerifCompteComponent } from './verif-compte/verif-compte.component';
import { ArticleConfirmerComponent } from './article-confirmer/article-confirmer.component';
import { ArticleRefuserComponent } from './article-refuser/article-refuser.component';
import { ListCompteComponent } from './list-compte/list-compte.component';  // Ajoutez cette ligne
import { MatGridListModule } from '@angular/material/grid-list';
import { CategorieClientComponent } from './categorie-client/categorie-client.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { VendorCarouselComponent } from './vendor-carousel/vendor-carousel.component';
import { FooterClientComponent } from './footer-client/footer-client.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { HeaderResponsableComponent } from './header-responsable/header-responsable.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { DetailComponent } from './detail/detail.component';
import { MessageComponent } from './message/message.component';
import { MessageAdminComponent } from './message-admin/message-admin.component';
import { AjoutMarqueComponent } from './ajout-marque/ajout-marque.component';
import { CatRespComponent } from './cat-resp/cat-resp.component';
import { MarqRespComponent } from './marq-resp/marq-resp.component';
import { ArticleChartComponent } from './article-chart/article-chart.component';
import { CategorieChartComponent } from './categorie-chart/categorie-chart.component';
import { RouterModule } from '@angular/router';






@NgModule({
  declarations: [
    AppComponent,
    ListCategorieComponent,
    AjoutCategorieComponent,
    ListSouscategorieComponent,
    AjoutSouscategorieComponent,
    ListMarqueComponent,
    AddMarqueComponent,
    AfficheMarqueComponent,
    HomeAdminComponent,
    NavbarComponent,
    FooterComponent,
    HomeClientComponent,
    HomeResponsableComponent,
    ListArticleComponent,
    AjoutArticleComponent,
    LoginComponent,
    ListArticleAdminComponent,
    InscriptionComponent,
    VerifCompteComponent,
    ArticleConfirmerComponent,
    ArticleRefuserComponent,
    ListCompteComponent,
    AjoutMarqueComponent,
    CategorieClientComponent,
    ArticleDetailComponent,
    VendorCarouselComponent,
    FooterClientComponent,
    UserChartComponent,
    HeaderResponsableComponent,
    PartenaireComponent,
    DetailComponent,
    MessageComponent,
    MessageAdminComponent,
    CatRespComponent,
    MarqRespComponent,
    ArticleChartComponent,
    CategorieChartComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: 'categorie-chart', component: CategorieChartComponent },
      


    ]),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
