export interface Compte {
  numCompte: string;
  type: string; // ex: "Compte courant", "Épargne", "Professionnel"
}

export interface Operation {
  id?: number;
  montant: number;
  libelle: string;
  type: 'DEPOT' | 'RETRAIT' | 'VIREMENT';
  dateOperation: string; // ISO string
  statut: 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE';
  compte: Compte;
}
