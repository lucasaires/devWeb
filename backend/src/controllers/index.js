import Problems from "../model/problems.js";
import { sha1 } from "object-hash";

export async function createdProblem(req, res) {
  try {
    const p = { ...req.body, hash: "0000" };
    const problem = await Problems.create(p);

    const hash = sha1(problem.id).substring(0, 4);

    const updatedProblem = await Problems.findOneAndUpdate(problem.id, {
      hash: hash,
    });

    return res.json({ ...updatedProblem, hash: hash });
  } catch (err) {
    return res.status(400).send({ error: "Erro Na criação do problema" });
  }
}
export async function editLike(req, res) {
  try {
    const id = req.params.id;

    const problem = await Problems.findById(id);

    const newProblem = await Problems.findByIdAndUpdate(id, {
      likes: ++problem.likes,
    });

    return res.json(newProblem);
  } catch (err) {
    return res.status(400).send({ error: "Erro Na edição dos likes" });
  }
}
export async function newComent(req, res) {
  try {
    const id = req.params.id;

    const problem = await Problems.findById(id);

    const newComents = [...problem.coments, req.body.coments];

    await Problems.findByIdAndUpdate(id, {
      coments: newComents,
    });

    const problmResolved = await Problems.findById(id);

    return res.json(problmResolved);
  } catch (err) {
    return res.status(400).send({ error: "Erro Na adiçao dos comentários " });
  }
}
export async function changeResolved(req, res) {
  try {
    const { id, hash } = req.params;

    let problem = await Problems.findById(id);

    if (problem.hash === hash) {
      problem = await Problems.findByIdAndUpdate(id, {
        isResolved: true,
      });
    }

    return res.json(problem);
  } catch (err) {
    return res.status(400).send({ error: "Erro na procura do problema" });
  }
}
export async function getAllProblems(req, res) {
  try {
    const problems = await Problems.find();

    let problemsFilter;

    req.query.historic === "true"
      ? (problemsFilter = problems.filter((problem) => {
          if (problem.isResolved === true) {
            return problem;
          }
        }))
      : (problemsFilter = problems.map((problem) => {
          if (problem.isResolved === false) {
            return problem;
          }
        }));

    let newArray = problemsFilter.filter(function (i) {
      return i;
    });

    return res.json(newArray);
  } catch (err) {
    return res.status(400).send({ error: "Erro na listagem dos problemas" });
  }
}
export async function getProblemById(req, res) {
  try {
    const id = req.params.id;
    const problem = await Problems.findById(id);

    return res.json(problem);
  } catch (err) {
    return res.status(400).send({ error: "Erro na listagem do problema" });
  }
}

export async function deleteProblemById(req, res) {
  try {
    const { id, hash } = req.params;

    let problem = await Problems.findById(id);

    if (problem.hash === hash) {
      await Problems.findByIdAndDelete({ _id: id });
    }

    return res.status(200).send({ ok: "Problema deletado" });
  } catch (err) {
    return res.status(400).send({ error: "Erro na remoção do problema" });
  }
}
