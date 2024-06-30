import express from "express";
import methodOverride from "method-override";
import { indexRouter } from "./routes/index";
import { QuotesRoutes } from "./routes/quotes";
import { engine } from "perthite-2";
import { overridePostMethod } from "./middlewares/method-override";
import { PostsRouter } from "./routes/posts";

const app = express();

app.engine('html', engine(app));
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(overridePostMethod));

app.disable('x-powered-by');

app.use("/quotes", QuotesRoutes);
app.use("/posts", PostsRouter);
app.use("/", indexRouter);

app.all("*", (req, res) => { res.status(404).send("Page Not Found") })

process.env.NODE_ENV = "development";
app.listen(3000);