import { Router } from "express";
import { QuotesController } from "../controllers/quotes.controller";

const quotesController = new QuotesController();

const QuotesRoutes = Router();

QuotesRoutes.get("/", quotesController.getAll);

QuotesRoutes.post("/", quotesController.createOne);

QuotesRoutes.put("/:id", quotesController.update);

QuotesRoutes.delete("/:id", quotesController.delete);

export {
    QuotesRoutes
}