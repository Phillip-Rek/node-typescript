import { quotesServices } from "../services/quotes.services";
import { Request, Response } from "express";
import { Controller } from "./controller";

export class QuotesController implements Controller {
    async index(req: Request, res: Response) {
        return res.render("quotes", { quotes: await quotesServices.getAll() });
    }

    async readOne(req: Request, res: Response): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    async createOne(req: Request, res: Response) {

        if (!(req.body.name && req.body.message)) {
            return res.status(400).send("Bad Request");
        }

        const quote = {
            name: req.body.name,
            message: req.body.message,
            date: new Date()
        }

        return res.send(await quotesServices.createOne(quote));

    }

    async updateOne(req: Request, res: Response) {
        if (!(req.body.name && req.body.message)) {
            return res.status(400).send("Bad Request");
        }

        const quote = {
            id: parseInt(req.params.id),
            name: req.body.name,
            message: req.body.message
        }

        return res.send(await quotesServices.update(quote))
    }

    async deleteOne(req: Request, res: Response) {
        throw new Error("not implemented");
    }
}

