import { Request, Response } from "express";
import { Controller } from "./controller";
import { PostsServices } from "../services/posts.services";

export class PostsController implements Controller {

    constructor(private postsServices: PostsServices) {

    }

    async index(req: Request, res: Response) {
        return res.render("posts", { posts: await this.postsServices.getAll() });
    }

    async readOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) { return res.status(400).send("Bad Request"); }

        return res.send(await this.postsServices.getOne(id));
    }

    async createOne(req: Request, res: Response) {
        if (!req.body.title || !req.body.description || !req.body.body) {
            return res.status(400).send("Bad Request");
        }

        return res.send(
            await this.postsServices.createOne({
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
            await this.postsServices.updateOne({
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

        return res.send(await this.postsServices.deleteOne(id));
    }
}