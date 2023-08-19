const { contas } = require("../bancodedados");

const informacoesObrigatorias = (req) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return { mensagem: "Todas as informações são obrigatórias." };
  }
};

const contaExistente = (req) => {
  const { cpf, email } = req.body;

  if (contas.find((conta) => conta.cpf === cpf || conta.email === email)) {
    return { mensagem: "Já existe uma conta com o cpf ou e-mail informado!" };
  }
};

const procurarConta = () => {
  const encontrarConta = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (!encontrarConta) {
    return { mensagem: "Conta não encontrada." };
  }
};

module.exports = {
  informacoesObrigatorias,
  contaExistente,
  procurarConta,
};
