import { Interface } from "./Interfaces";

export interface Client{
    id: number|null;
    name: string;
    email: string;
    phone: string;
    permet: string;
    cin: string;
    username: string;
    role : any;
    interfaces: any[];
    ville: string;
    password: string | null;
    type: string;

}