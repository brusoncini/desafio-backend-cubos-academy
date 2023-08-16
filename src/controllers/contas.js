const contas = require("../bancodedados");

const listarContas = (req, res) => {
  res.json(contas);
};

const criarConta = (req, res) => {};

const atualizarConta = (req, res) => {};

const excluirConta = (req, res) => {};

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
};
