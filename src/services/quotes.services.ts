import { Quote, quotes } from "../models/quotes";


export class QuotesServices {

    constructor() { }

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

export const quotesServices = new QuotesServices();