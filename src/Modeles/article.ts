export interface Article {
  id: string;
  Nom: string;
  Reference: string;
  Categorie: string;
  SousCategorie: string;
  Marque: string;
  Prix: number;
  ResponsableId: string;
  approved: boolean;
  Etat: string;
  ImageUrl?: string;
  Lien?: string;
  Description?: string; // Nouveau champ Description
}
