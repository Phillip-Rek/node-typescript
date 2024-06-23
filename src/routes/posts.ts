import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";


const PostsRouter = Router();

const { updateOne, deleteOne, index, createOne } = new PostsController();

PostsRouter.get("/", index);

PostsRouter.post("/", createOne);

PostsRouter.put("/:id", updateOne);

PostsRouter.delete("/:id", deleteOne);


export { PostsRouter }