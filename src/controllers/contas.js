let { numero, saldo, contas } = require("../bancodedados");

const listarContas = (req, res) => {
  res.json(contas);
};

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  // verificações
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todas as informações são obrigatórias." });
  }

  for (const conta of contas) {
    if (conta.cpf === cpf || conta.email === email) {
      return res.status(400).json({
        mensagem: "Já existe uma conta com o cpf ou e-mail informado!",
      });
    }
  }
  // cria uma nova conta
  const novaConta = {
    numero: numero++,
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
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todas as informações são obrigatórias." });
  }

  for (const conta of contas) {
    if (conta.cpf === cpf || conta.email === email) {
      return res.status(400).json({
        mensagem: "Já existe uma conta com o cpf ou e-mail informado!",
      });
    }
  }

  const conta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  const encontraUsuario = contas.find((conta) => {
    return nome === usuario;
  });

  if (!encontraUsuario) {
    return res
      .status(404)
      .json({ mensagem: "Conta ou usuário não encontrados." });
  }

  // atualiza os dados
  conta.nome = nome;
  conta.cpf = cpf;
  conta.data_nascimento = data_nascimento;
  conta.telefone = telefone;
  conta.email = email;
  conta.senha = senha;

  return res.status(204).send();
};

const excluirConta = (req, res) => {
  const { numeroConta } = req.params;

  // verifica se a conta informada existe
  const conta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!conta) {
    return res.status(404).json({ mensagem: "Conta não encontrada." });
  }

  // verifica se o saldo é 0
  if (saldo !== 0) {
    return res
      .status(400)
      .json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
  }

  // filtra as contas que não tem o numero passado
  contas = contas.filter((conta) => {
    return conta.numero !== Number(numeroConta);
  });

  return res.status(204).send();
};

module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
};
