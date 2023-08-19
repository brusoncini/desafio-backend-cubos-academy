let { numero, saldo, contas } = require("../bancodedados");
const { informacoesObrigatorias, contaExistente, procurarConta } = require("./funcoes");

const listarContas = (req, res) => {
  res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // verificações
  const validacaoInformacoes = informacoesObrigatorias(req);
  if (validacaoInformacoes) {
    return res.status(400).json(validacaoInformacoes);
  }

  const validacaoConta = contaExistente(req);
  if (validacaoConta) {
    return res.status(400).json(validacaoConta);
  }

  // cria uma nova conta
  const novaConta = {
    numero: contas.length + 1,
    saldo: 0,
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
  };

  contas.push(novaConta);

  return res.status(201).send();
};

const atualizarConta = (req, res) => {
  const { numeroConta, usuario } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // verificações
  const localizarConta = procurarConta(req);
  if(!localizarConta) {
    return res.status(404).json(localizarConta);
  }

  const encontrarUsuario = contas.find((conta) => {
    return conta.nome === usuario;
  });

  if (!encontrarUsuario) {
    return res
      .status(404)
      .json({ mensagem: "Conta ou usuário não encontrados." });
  }

  const validacaoInformacoes = informacoesObrigatorias(req);
  if (validacaoInformacoes) {
    return res.status(400).json(validacaoInformacoes);
  }

  const validacaoConta = contaExistente(req);
  if (validacaoConta) {
    return res.status(400).json(validacaoConta);
  }

  // atualiza os dados
  const contaAtualizada = {
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha,
  };

  return res.status(204).send();
};

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  // verifica se a conta informada existe
  const localizarConta = procurarConta(req);
  if(!localizarConta) {
    return res.status(404).json(localizarConta);
  }

  // verifica se o saldo é 0
  if (saldo !== 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  // retira a conta do array
  contas.splice(
    contas.findIndex((conta) => conta.numero === Number(numeroConta)),
    1
  );

  return res.status(204).send();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
};
