const itens = require("./controllers");

const express = require("express");

const routes = express.Router();

routes.post("/", itens.updated);
routes.get("/", itens.index);

module.exports = routes;
