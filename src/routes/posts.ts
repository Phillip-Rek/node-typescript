import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";
import { postsServices } from "../services/posts.services";

const PostsRouter = Router();

const postsController = PostsController.getInstance(postsServices);

PostsRouter.get("/", postsController.index);

PostsRouter.get("/:id", postsController.readOne);

PostsRouter.post("/", postsController.createOne);

PostsRouter.put("/:id", postsController.updateOne);

PostsRouter.delete("/:id", postsController.deleteOne);

export { PostsRouter }