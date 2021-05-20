const express = require("express");
const cors = require("cors");
const routes = require("./api");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', routes(app));

app.listen(port, () => {
  console.log(`api executando na url http://localhost:${port}`)
});