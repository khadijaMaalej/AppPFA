import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { ListSouscategorieComponent } from './list-souscategorie/list-souscategorie.component';
import { ListMarqueComponent } from './list-marque/list-marque.component';
import { AddMarqueComponent } from './add-marque/add-marque.component';
import { AfficheMarqueComponent } from './affiche-marque/affiche-marque.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomeResponsableComponent } from './home-responsable/home-responsable.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { LoginComponent } from './login/login.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { ListArticleAdminComponent } from './list-article-admin/list-article-admin.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { VerifCompteComponent } from './verif-compte/verif-compte.component';
import { ArticleConfirmerComponent } from './article-confirmer/article-confirmer.component';
import { ArticleRefuserComponent } from './article-refuser/article-refuser.component';
import { ListCompteComponent } from './list-compte/list-compte.component';
import { CategorieClientComponent } from './categorie-client/categorie-client.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { MessageComponent } from './message/message.component';
import { MessageAdminComponent } from './message-admin/message-admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'ajoutcategorie' , component : AjoutCategorieComponent ,  canActivate: [AuthGuard]},
  { path: 'categorie' , component : ListCategorieComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' } },

  {  path: 'categorie/:id', component: ListSouscategorieComponent , canActivate: [AuthGuard] , data: { expectedRole: 'admin' }},
  { path: 'listesouscategorie/:id', component: ListSouscategorieComponent , canActivate: [AuthGuard]},
  { path: 'listemarque/:id', component: ListMarqueComponent ,canActivate: [AuthGuard] },
 
  // { path: 'addmarque', component: AddMarqueComponent },
  { path: 'affichemarque', component: AfficheMarqueComponent , canActivate: [AuthGuard] , data: { expectedRole: 'admin' } },
  { path: 'homeclient', component: HomeClientComponent },
  { path: 'homeresponsable', component: HomeResponsableComponent ,canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  { path: 'homeadmin', component: HomeAdminComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' } },

  { path: 'listarticle', component: ListArticleComponent ,canActivate: [AuthGuard], data: { expectedRole: 'responsable' } },
  { path: 'login', component: LoginComponent },
  { path: 'verifmarque', component: ListArticleAdminComponent ,canActivate: [AuthGuard], data: { expectedRole: 'admin' } },  
  { path : 'inscription' , component : InscriptionComponent},
  { path: 'verifcompte', component: VerifCompteComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  { path: 'articleconfirmer', component: ArticleConfirmerComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'articlerefuser', component: ArticleRefuserComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'listcompte', component: ListCompteComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' }},
  { path: 'catclient', component: CategorieClientComponent },


  { path: '', component: HomeClientComponent },

  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'partenaire', component: PartenaireComponent },

  { path: 'messages', component: MessageComponent , canActivate: [AuthGuard], data: { expectedRole: 'responsable' } },







  { path: 'adminmessages', component: MessageAdminComponent , canActivate: [AuthGuard], data: { expectedRole: 'admin' } },









];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' },
    
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }

