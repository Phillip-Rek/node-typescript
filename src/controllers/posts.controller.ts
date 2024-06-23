import { Request, Response } from "express";
import { postsServices } from "../services/posts.services";
import { posts } from "../models/posts";

export abstract class Controller {
    async index(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async createOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async updateOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async deleteOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async readOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
}

export class PostsController implements Controller {

    async index(req: Request, res: Response) {
        return res.render("posts", { quotes: await postsServices.getAll() });
    }

    async readOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Bad Request"); }

        return res.send(await postsServices.getOne(id));
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

    async updateOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!req.body.title || !req.body.description || !req.body.body || Number.isNaN(id)) {
            return res.status(400).send("Bad Request");
        }

        const post = {
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            date: new Date(),
            id
        }

        return res.send(await postsServices.updateOne(post));
    }

    async deleteOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Invalid id") }

        return res.send(await postsServices.deleteOne(id));
    }
}