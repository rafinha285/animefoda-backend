import {RawData, WebSocketServer, WebSocket} from "ws"
import Console from "../functions/general/Console";
import e from "express";
import { IncomingMessage,createServer,Server } from 'http'

const clients = new Set<WebSocket>()

function onError(ws:WebSocket,err: Error) {
    Console.error(err.toString())
}

function onMessage(ws:WebSocket,data:RawData) {
    Console.log(data.toString())
}

function onConnect(ws:WebSocket,req:IncomingMessage) {
    clients.add(ws)

    ws.on('message',data => onMessage(ws,data))
    ws.on('error', error =>onError(ws,error))
    ws.on("close", () => {
        clients.delete(ws);
        Console.log("Cliente desconectado");
    });
}



export default (app:e.Application):WebSocketServer=>{
    const server: Server = createServer(app);
    const wss = new WebSocketServer({server})
    wss.on('connection', onConnect)
    Console.log(`WebSocketServer Criado em ws://localhost:4433`)
    return wss
}
