import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";


const PostsRoute = Router();

const { updateOne, deleteOne, index, createOne } = new PostsController();

PostsRoute.get("/", index);

PostsRoute.post("/", createOne);

PostsRoute.put("/:id", updateOne);

PostsRoute.delete("/:id", deleteOne);

export {
    PostsRoute
}