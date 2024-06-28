import { Request, Response } from "express";
import { Controller } from "./controller";
import { PostsServices } from "../services/posts.services";

export class PostsController implements Controller {
    private static instance?: PostsController;
    private static postsServices: PostsServices;

    private constructor(postsServices: PostsServices) {
        PostsController.postsServices = postsServices;


    }

    static getInstance(service: PostsServices) {
        if (!this.instance) { this.instance = new PostsController(service); }
        return this.instance;
    }

    async index(req: Request, res: Response) {

        const posts = await PostsController.postsServices.getAll();

        return res.render("posts", { posts });
    }

    async readOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Bad Request"); }

        return res.send(await PostsController.postsServices.getOne({ id }));
    }

    async createOne(req: Request, res: Response) {
        if (!req.body.title || !req.body.description || !req.body.body) {
            return res.status(400).send("Bad Request");
        }

        const post = {
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            date: new Date().toISOString()
        }

        return res.send(await PostsController.postsServices.createOne(post));
    }

    async updateOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!req.body.date || !req.body.title || !req.body.description || !req.body.body || Number.isNaN(id)) {
            return res.status(400).send("Bad Request");
        }

        return res.send(
            await PostsController.postsServices.updateOne(id, {
                title: req.body.title,
                description: req.body.description,
                body: req.body.body,
                date: req.body.date
            })
        );
    }

    async deleteOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Invalid id") }

        return res.send(await PostsController.postsServices.deleteOne(id));
    }
}
