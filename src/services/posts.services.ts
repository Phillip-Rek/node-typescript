import { posts, Post } from "../models/posts";

class PostsServices {

    async getAll() {
        return posts.getAll();
    }

    async createOne(post: Omit<Post, "id">) {
        return posts.createOne(post);
    }

    async updateOne(post: Omit<Post, "date">) {
        return posts.update(post);
    }
}

const postsServices = new PostsServices();