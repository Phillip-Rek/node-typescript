import { Request, Response } from "express";
import { PostsServices } from "../services/posts.services";
import { Singleton } from "../utils/singleton";

@Singleton
export class PostsController {
    private postsServices: PostsServices;

    constructor(postsServices: PostsServices) {
        this.postsServices = postsServices;
    }

    async index(req: Request, res: Response) {

        const posts = await this.postsServices.getAll();

        return res.render("posts", { posts });
    }

    async readOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Bad Request"); }

        return res.send(await this.postsServices.getOne({ id }));
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

        return res.send(await this.postsServices.createOne(post));
    }

    async updateOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (!req.body.date || !req.body.title || !req.body.description || !req.body.body || Number.isNaN(id)) {
            return res.status(400).send("Bad Request");
        }

        return res.send(
            await this.postsServices.updateOne({ id }, {
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

        return res.send(await this.postsServices.deleteOne(id));
    }
}
