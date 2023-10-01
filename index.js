const express = require("express");
require("express-async-errors");
const methodOverride = require("method-override");
const {giftRouter} = require("./routers/gift");
const {childRouter} = require("./routers/child");
const {homeRouter} = require("./routers/home");
const {handleError} = require("./utils/errors");
const {engine} = require("express-handlebars");
require('./utils/db');
const {handlebarsHelpers} = require("./utils/handlebars-helpers");

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