import * as express from "express";
export function setHeader(res:express.Response){
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
}
