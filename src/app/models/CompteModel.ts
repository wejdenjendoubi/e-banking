export interface CompteModel {
  numCompte: string;
  agence: string;
  user?: {
    login: string;
  };
  operations?: {
    id: number;
    montant: number;
    libelle: string;
  }[];
}
