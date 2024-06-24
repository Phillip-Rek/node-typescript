import { posts, Post, PostsModels } from "../models/posts";

class Posts {

    constructor(private posts: PostsModels) { }

    async getAll() {
        return this.posts.getAll();
    }

    async createOne(post: Omit<Post, "id">) {
        return this.posts.createOne(post);
    }

    async updateOne(post: Omit<Post, "date">) {
        return this.posts.update(post);
    }

    async deleteOne(id: number) {
        return this.posts.deleteOne(id);
    }

    async getOne(id: number) {
        return this.posts.getOne(id);
    }
}

export declare type PostsServices = Posts;

export const postsServices = new Posts(posts);
