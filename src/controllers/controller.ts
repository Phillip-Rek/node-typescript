import { Request, Response } from "express";

export abstract class Controller {
    index(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    createOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    updateOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    deleteOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };

    readOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
}