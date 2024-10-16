export interface SousCategorie {
    Nom: string;
    Type: string;
    id: string;
    Categorie?: string; // Ajouté dynamiquement
  }
  
  export interface Categorie {
    id: string;
    Nom: string;
    Slogan: string;
    sousCategories: SousCategorie[];
  }
  