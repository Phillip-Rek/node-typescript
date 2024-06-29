import { Request, Response } from "express";

export abstract class Controller {
    static async index(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    static async createOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    static async updateOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    static async deleteOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    static async readOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
}