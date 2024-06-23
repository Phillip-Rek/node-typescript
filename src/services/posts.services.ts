import { posts, Post } from "../models/posts";

class PostsServices {

    async getAll() {
        return posts.getAll();
    }

    async createOne(post: Omit<Post, "id">) {
        return posts.createOne(post);
    }
}

const postsServices = new PostsServices();