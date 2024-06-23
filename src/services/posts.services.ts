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

    async deleteOne(id: number) {
        return posts.deleteOne(id);
    }
}

export const postsServices = new PostsServices();