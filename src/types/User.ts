import {roles} from "./General";

export interface User{
    _id:string;
    name:string;
    surname:string
    username:string;
    birthDate:Date;
    email:string;
    role:roles[]
    password:string;
    salt:string;
    totalanime:number;
    totalanimewatching:number;
    totalanimecompleted:number;
    totalanimeonhold:number;
    totalanimedropped:number;
    totalanimeplantowatch:number;
    totalmanga:number;
    totalmangareading:number;
    totalmangacompleted:number;
    totalmangaonhold:number;
    totalmangadropped:number;
    totalmangaplantoread:number;
    totalanimeliked:string[];
    totalmangaliked:string[]
}
export enum priorityValue{
    LOW="Baixa",
    MEDIUM="Media",
    HIGH="Alta"
}
export enum userAnimeState{
    watching="Assistindo",
    completed="Completado",
    on_hold="Em espera",
    dropped="Desistido",
    plan_to_watch="Pretendo assistir"
}
export enum roleEnum{
    'adm',
    'client',
    'creator'
}
