import {WebSocket} from "ws";

export default function sendCommentWS(ws:WebSocket,comment:object){
    const commentJson = JSON.stringify(comment);
}
