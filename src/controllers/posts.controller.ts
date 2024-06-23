import { Request, Response } from "express";
import { postsServices } from "../services/posts.services";

export abstract class Controller {
    async index(req: Request, res: Response): Promise<unknown> { throw new Error("Method not implemented"); };
    async createOne(req: Request, res: Response): Promise<unknown> { throw new Error("Method not implemented"); };
    async updateOne(req: Request, res: Response): Promise<unknown> { throw new Error("Method not implemented"); };
    async deleteOne(req: Request, res: Response): Promise<unknown> { throw new Error("Method not implemented"); };
}

export class PostsController implements Controller {
    async updateOne(req: Request, res: Response) {
        if (!req.body.title || !req.body.description || !req.body.body) {
            return res.status(400).send("Bad Request");
        }

        const post = {
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            date: new Date()
        }

        return res.send(await postsServices.createOne(post));
    }

    async deleteOne(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }

    async index(req: Request, res: Response) {
        return res.render("posts", { quotes: await postsServices.getAll() });
    }

    async createOne(req: Request, res: Response) {
        if (!req.body.title || !req.body.description || !req.body.body) {
            return res.status(400).send("Bad Request");
        }

        const post = {
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            date: new Date()
        }

        return res.send(await postsServices.createOne(post));

    }
}