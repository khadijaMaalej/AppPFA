// src/Modeles/user.ts

export interface User {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  role: 'admin' | 'responsable' | 'user';
  status: 'approved' | 'pending' | 'rejected';
  numeroCIN: string; // Ajoutez cette ligne
  magasin: string;   // Ajoutez cette ligne
  // Ajoutez d'autres propriétés si nécessaire
}
