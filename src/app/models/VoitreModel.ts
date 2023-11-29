import { Agence } from "./Agence";

export interface Voiture{
    id: null|number,
    marque: string,
    model: string;
    anfab: string;
    categorie: string;
    prix: number|null;
    disponible: boolean;
    agence:Agence|any,
    imgurl: string;
}