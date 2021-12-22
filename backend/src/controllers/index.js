const problemas = [];

module.exports = {
  async updatedProblems(req, res) {
    try {
      const prob = {
        nome: `problema ${problemas.length + 1} cadastrado`,
      };

      problemas.push(prob);
      return res.json(problemas);
    } catch (err) {
      return res.status(400).send({ error: "Erro Na criação do problema" });
    }
  },

  async getAllProblems(req, res) {
    return res.json(problemas);
  },
};
