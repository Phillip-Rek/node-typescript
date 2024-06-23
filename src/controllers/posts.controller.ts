import { Request, Response } from "express";
import { postsServices } from "../services/posts.services";

export class PostsController {

    async index(req: Request, res: Response) {
        return res.render("posts", { quotes: await postsServices.getAll() });
    }
}