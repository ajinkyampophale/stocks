import express from "express";
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', require("./routes/index"));
app.use('/stock_price', require("./routes/computeStockPrice"));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export = app;