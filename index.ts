import express from "express";
import "express-async-errors";
import methodOverride from "method-override";
import {giftRouter} from "./routers/gift";
import {childRouter} from "./routers/child";
import {homeRouter} from "./routers/home";
import {handleError} from "./utils/errors";
import {engine} from "express-handlebars";
import {handlebarsHelpers} from "./utils/handlebars-helpers";
import "./utils/db";

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
// app.use(express.json()); //Content-type: application/json
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: handlebarsHelpers, //Dodatkowe funkcjonalności, które chcemy dadać do Handlebarsów
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);

app.listen(3001, 'localhost', () => {
    console.log('Listening on http://localhost:3001');
})