import { Router } from "express";
import { QuotesController } from "../controllers/quotes.controller";

const quotesController = new QuotesController();

const QuotesRoutes = Router();

QuotesRoutes.get("/", quotesController.index);

QuotesRoutes.post("/", quotesController.createOne);

QuotesRoutes.put("/:id", quotesController.updateOne);

QuotesRoutes.delete("/:id", quotesController.deleteOne);

export {
    QuotesRoutes
}