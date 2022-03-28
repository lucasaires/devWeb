import { Router } from "express";

import {
  getAllProblems,
  getProblemById,
  createdProblem,
  newComent,
  editLike,
  deleteProblemById,
  changeResolved,
} from "./controllers/index.js";

const routes = Router();

routes.get("/problems", getAllProblems);

routes.get("/problem/:id", getProblemById);

routes.post("/newProblem", createdProblem);
routes.post("/newComent/:id", newComent);
routes.put("/changeResolved/:id/:hash", changeResolved);
routes.put("/editLike/:id", editLike);
routes.delete("/deleteProblem/:id/:hash", deleteProblemById);

export default routes;
