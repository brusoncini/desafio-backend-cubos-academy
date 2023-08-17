let {
  banco,
  numero,
  saldo,
  contas,
  saques,
  depositos,
  transferencias,
} = require("../bancodedados");

const listarContas = (req, res) => {
  res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todas as informações são obrigatórias." })
  }

  const conta = {
    numero: numero++,
    saldo: 0,
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha
  };

  contas.push(conta);

  return res.status(201).send();
};

const atualizarConta = (req, res) => {};

const excluirConta = (req, res) => {};

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
};
