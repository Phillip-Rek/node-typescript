import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";
import { PostsServices } from "../services/posts.services";
import { posts } from "../models/posts";

const PostsRouter = Router();

const postsController = PostsController.getInstance(PostsServices.getInstance(posts));

PostsRouter.get("/", postsController.index);

PostsRouter.get("/:id", postsController.readOne);

PostsRouter.post("/", postsController.createOne);

PostsRouter.put("/:id", postsController.updateOne);

PostsRouter.delete("/:id", postsController.deleteOne);

export { PostsRouter }