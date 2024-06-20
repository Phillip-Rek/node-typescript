import router, { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res) => { res.send("hello world") });


export {
    indexRouter
}


// app.get("/", (req, { send }) => { send("hello world") })

