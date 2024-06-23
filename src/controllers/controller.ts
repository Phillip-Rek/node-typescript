export abstract class Controller {
    async index(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async createOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async updateOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async deleteOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
    async readOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented");
    };
}