import express from "express";
const methodOverride = require('method-override');
import { indexRouter } from "./routes/index";
import { quotesRoutes } from "./routes/quotes";
import { engine } from "perthite-2";

const app = express();

app.engine('html', engine(app));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride((req: { body: { _method: any; }; }, res: any) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use("/quotes", quotesRoutes);

app.use("/", indexRouter);

app.all("*", (req, res) => {
    res.status(404).send("Page Not Found")
})

process.env.NODE_ENV = "development";
app.listen(3000);