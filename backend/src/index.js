const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const problemas = [];

app.use(routes);

app.listen(process.env.PORT || 3000, () =>
  console.log("Example app listening on port 3000!")
);
