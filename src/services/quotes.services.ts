import { Quote, quotes, QuotesModels } from "../models/quotes";


export class QuotesServices {

    constructor(quotes: QuotesModels) { }

    async createOne(user: Omit<Quote, "id">) {
        return quotes.createOne(user);
    }

    async getAll() {
        return quotes.getAll();
    }

    async update(quote: Omit<Quote, "date">) {
        return quotes.update(quote);
    }
}

// export const quotesServices = new QuotesServices();