import { quotesServices } from "../services/quotes.services";
import { Request, Response } from "express";

export class QuotesController {

    async getAll(req: Request, res: Response) {
        return res.render("quotes", { quotes: await quotesServices.getAll() });
    }

    async createOne(req: Request, res: Response) {

        if (!(req.body.name && req.body.message)) return

        const quote = {
            name: req.body.name,
            message: req.body.message,
            date: new Date()
        }

        return res.send(await quotesServices.createOne(quote));

    }

    async update(req: Request, res: Response) {
        throw new Error("not implemented");
    }

    async delete(req: Request, res: Response) {
        throw new Error("not implemented");
    }
}

