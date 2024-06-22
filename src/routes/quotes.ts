import { Router } from "express";
import { QuotesController } from "../controllers/quotes.controller";

const quotesController = new QuotesController();

const quotesRoutes = Router();

quotesRoutes.get("/", quotesController.getAll);

quotesRoutes.post("/", quotesController.createOne);

quotesRoutes.put("/:id", quotesController.update);

quotesRoutes.delete("/:id", quotesController.delete);

export {
    quotesRoutes
}