import { WebSocketServer } from "ws";
import { JWT_SECRET, WEBSOCKET_PORT } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import {prisma} from "@repo/db"

const wss = new WebSocketServer({port: WEBSOCKET_PORT});


wss.on("connection", function connection(ws, request) {
    const url = request.url; //ws://localhost:3000?token=1234 

    if(!url) {
        return;
    }
    //can check this at http level too when first connected.
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    const decoded = jwt.verify(token as string, JWT_SECRET) as string;

    if(typeof decoded == "string"){
        return;
    }
    if(!decoded || !((decoded) as JwtPayload).userId){
        ws.close();
        return;
    };

    ws.on("message", function message(data) {
        console.log("received: %s", data);
        ws.send("pong")
    });

    ws.send("something");
});