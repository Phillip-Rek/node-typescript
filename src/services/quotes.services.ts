import { Quote, quotes } from "../models/quotes";


export class QuotesServices {

    constructor() { }

    async createOne(user: Omit<Quote, "id">) {
        return quotes.createOne(user);
    }

    async getAll() {
        return quotes.getAll();
    }
}

export const quotesServices = new QuotesServices();