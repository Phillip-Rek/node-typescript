import { Request, Response } from "express";
import { postsServices } from "../services/posts.services";
import { Controller } from "./controller";

export class PostsController implements Controller {

    constructor() {
        for (let i = 0; i < 5; i++) {
            postsServices.createOne({
                title: "hello world post number " + i,
                description: "describing a hello world blog post number " + i,
                body: "more content on hello world blog post. more content on hello world blog post. more content on hello world blog post. more content on hello world blog post. ",
                date: new Date()
            })
        }
    }

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

        return res.send(
            await postsServices.createOne({
                title: req.body.title,
                description: req.body.description,
                body: req.body.body,
                date: new Date()
            })
        );
    }

    async updateOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!req.body.title || !req.body.description || !req.body.body || Number.isNaN(id)) {
            return res.status(400).send("Bad Request");
        }

        return res.send(
            await postsServices.updateOne({
                title: req.body.title,
                description: req.body.description,
                body: req.body.body,
                id
            })
        );
    }

    async deleteOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Invalid id") }

        return res.send(await postsServices.deleteOne(id));
    }
}