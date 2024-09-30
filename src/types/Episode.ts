export enum languages{
    Japanese = 'ja',
    Portuguese = 'pt',
    English = 'en',
    Spanish = 'es',
}
interface AudioTracks{
    language:languages
}
export interface SubtitlesTracks{
    language:languages
}
export interface Episode{
    id:string
    epindex:number;
    name:string;
    anime_id:string;
    releasedate:Date;
    views?:number;
    duration:number;
    openingstart:number;
    openingend:number;
    ending:number;
    audiotracks:languages[];
    subtitlestracks?:string[];
    season_id:string
    resolution:string[]
    date_added:Date;
}
export interface EpisodeUser{
    episode_id:string;
    dropped_on:number;
    season_id:string
    anime_id:string;
    user_id:string;
    id:string;
    date:Date;
    duration:number;
    ep_index:number;
    name:string;
}
export interface EpisodeSim{
    id:string
    anime_id:string;
    season_id:string;
    name:string;
    duration:number;
    resolution:string[];
    animename:string;
    seasonname:string;
    date_added:Date
}
