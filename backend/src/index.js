import express, { json, urlencoded } from "express";
import pkg from "mongoose";
import routes from "./routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes);
const { connect } = pkg;
connect("mongodb+srv://admin:admin@cluster0.ezhcw.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT || 3334, () =>
  console.log("Example app listening on port 3334!")
);
