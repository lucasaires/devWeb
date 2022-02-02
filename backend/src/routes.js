import { Router } from "express";

import {
  getAllProblems,
  getProblemById,
  createdProblem,
  newComent,
  editLike,
  deleteProblemById,
} from "./controllers/index.js";

const routes = Router();

routes.get("/problems", getAllProblems);

routes.get("/problem/:id", getProblemById);

routes.post("/newProblem", createdProblem);
routes.post("/newComent/:id", newComent);
routes.put("/editLike/:id", editLike);
routes.delete("/deleteProblem/:id", deleteProblemById);

export default routes;
