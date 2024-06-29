import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";
import { PostsServices } from "../services/posts.services";
import { posts } from "../models/posts";

const PostsRouter = Router();

const postsServices = new PostsServices(posts)

const postsController = <PostsController>PostsController.getInstance(postsServices);

const update = async () => {
    console.log(
        await postsServices.updateOne(
            {
                id: 1,
                title: 'the time is 15:31',
            },
            {
                title: "updated title on id 1",
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