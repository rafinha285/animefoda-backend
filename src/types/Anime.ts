import {EpisodeUser} from "./Episode";
import {character} from "./Character";
import {Audio, priorityValue, quality, state, StateType, userAnimeState} from "./General";

export interface Producer{
    id:string;
    name:string;
}
export interface Season{
    id:string;
    name: string;
    episodes: string[];
    index: number;
}
export interface SeasonList{
    anime_id:string;
    season_id:string;
    total_episodes:number;
    total_rewatched_episodes?:number;
    id?:number;
}
export interface Anime{
    id:string;
    name:string;
    name2:string;
    description:string;
    quality:quality;
    language:Audio;
    state:state;
    releasedate:Date;
    studios:Producer[];
    producers:Producer[];
    creators:Producer[];
    genre:string[];
    seasons?:Season[];
    rating?:number;
    characters?:character[];
    // path?:string;
    averageeptime?:number;
    date_added?:Date;
    visible:boolean;
    weekday:string
}
export interface AnimeUser{
    user_id:string;
    id:number
    anime_id:string
    name:string;
    // watched_episodes:number;
    start_date?:Date;
    finish_date?:Date;
    rate:number;
    status:userAnimeState;
    // times_watched?:number;
    // rewatched_episodes?:number;
    priority:priorityValue;
    // last_ep:EpisodeUser[]
}
export interface AnimeSearch{
    id:string;
    name:string;
    description:string;
    // rating:number;
}
export interface AnimeAgenda{
    id:string;
    name:string;
    description:string;
    rating:number;
    weekday:string
}
export enum animeListStatus{
    'watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch'
}
