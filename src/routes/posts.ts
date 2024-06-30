import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";
import { PostsServices } from "../services/posts.services";
import { Posts } from "../models/posts";

const PostsRouter = Router();

export const postsModels = new Posts();

const postsServices = new PostsServices(postsModels);

const postsController = new PostsController(postsServices);

const update = async () => {
    console.log(
        await postsServices.createOne(
            {
                title: "Phillip Rekhotho",
                description: "describing phillip rekhotho",
                body: "more information about phillip rekhotho",
                date: new Date().toISOString().substring(0, 18).replace("T", " ")
            })
    )

    console.log(
        await postsServices.getOne({ id: 1 })
    )
}

setTimeout(update, 3000);

PostsRouter.get("/", postsController.index);

PostsRouter.get("/:id", postsController.readOne);

PostsRouter.post("/", postsController.createOne);

PostsRouter.put("/:id", postsController.updateOne);

PostsRouter.delete("/:id", postsController.deleteOne);

export { PostsRouter }