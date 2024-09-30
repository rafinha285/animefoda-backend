export function cut(string:string){
    var s:string = string.replace(/[^a-zA-Z0-9-_ ]/g, "")
    return s
}
