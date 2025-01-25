export interface Comment {
    id:number;
    parent_id:number;
    page_id:string;
    user_id:string;
    content:string;
    created_at:Date;
}
