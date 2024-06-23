import { Request, Response } from "express";
import { postsServices } from "../services/posts.services";



export class PostsController {
    updateOne(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
    deleteOne(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    async index(req: Request, res: Response) {
        return res.render("posts", { quotes: await postsServices.getAll() });
    }

    async createOne(req: Request, res: Response) {
        throw new Error("Method not implemented.");
        // if (!(req.body.name && req.body.message)) {
        //     return res.status(400).send("Bad Request");
        // }

        // const post = {
        //     name: req.body.name,
        //     message: req.body.message,
        //     date: new Date()
        // }

        // return res.send(await postsServices.createOne(post));

    }
}