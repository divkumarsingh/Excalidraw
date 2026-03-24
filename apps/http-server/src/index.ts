import express from "express";
import { BACKEND_PORT, JWT_SECRET } from "@repo/backend-common/config";
import { UserMiddleware } from "./middleware";
import jwt from "jsonwebtoken";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"


const app = express();
app.use(express.json());

app.post("/api/v1/signup", async(req, res) => {

    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const username = req.body.username;
    const password = req.body.password;

    //database call to send the data
    res.status(200).json({
        message: "signup end point working"
    })
});

app.post("/api/v1/signin", async(req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }
    
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({
        username,
        password
    }, JWT_SECRET);

    res.json({
        token
    })

});

app.post("/api/v1/room", UserMiddleware, async(req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    };


    //db call;
    
    res.json({
        roomId: 123
    })

});


app.get("/api/v1/content", async(req, res) => {

});

app.delete("/api/v1/room", async(req, res) => {

});


app.listen(`${BACKEND_PORT}`, () => {
    console.log("connected to port " + `${BACKEND_PORT}`)
});