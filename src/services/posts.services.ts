import { posts, Post, PostsModels } from "../models/posts";
export class PostsServices {
    constructor(private posts: PostsModels) { }

    async getAll() {
        return await this.posts.getAll();
    }

    async createOne(post: Omit<Post, "id">) {
        return await this.posts.createOne(post);
    }

    async updateOne(id: number, post: Partial<Omit<Post, "id">>) {
        return await this.posts.updateOne(id, post);
    }

    async deleteOne(id: number) {
        return await this.posts.deleteOne(id);
    }

    async getOne(post: Partial<Post>) {
        return await this.posts.getOne(post);
    }
}
