import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";
import { postsServices } from "../services/posts.services";

const PostsRouter = Router();

const { updateOne, deleteOne, index, createOne, readOne } = PostsController.getInstance(postsServices);

PostsRouter.get("/", index);

PostsRouter.get("/:id", readOne);

PostsRouter.post("/", createOne);

PostsRouter.put("/:id", updateOne);

PostsRouter.delete("/:id", deleteOne);

export { PostsRouter }