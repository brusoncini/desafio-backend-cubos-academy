let {
  contas,
  saques,
  depositos,
  transferencias,
} = require("../bancodedados");

const { format } = require("date-fns");

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  // valida informações
  if (!numero_conta || !valor) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }

  const contaExistente = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!contaExistente) {
    return res.status(400).json({ mensagem: "A conta informada não existe." });
  }

  // verifica se o valor é maior que 0
  if (valor <= 0) {
    return res.status(400).json({
      mensagem: "Não é permitido depositar um valor negativo ou igual a zero.",
    });
  }

  // deposita na conta
  contaExistente.saldo += valor;

  depositos.push({
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numero_conta,
    valor,
  });

  res.status(204).send();
};

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todas as informações são obrigatórias." });
  }

  const contaExistente = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!contaExistente) {
    return res.status(400).json({ mensagem: "A conta informada não existe." });
  }

  if (valor > contaExistente.saldo) {
    return res.status(400).json({
      mensagem: "O saldo da conta deve ser maior do que o valor de saque.",
    });
  }

  contaExistente.saldo -= valor;

  saques.push({
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numero_conta,
    valor,
  });

  res.status(204).send();
};

const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(400).json({
      mensagem:
        "Todas as informações são obrigatórias.",
    });
  }

  const contaOrigem = contas.find((conta) => {
    return conta.numero === Number(numero_conta_origem);
  });

  const contaDestino = contas.find((conta) => {
    return conta.numero === Number(numero_conta_destino);
  });

  if (!contaOrigem || !contaDestino) {
    return res.status(400).json({
      mensagem:
        "A conta informada não existe.",
    });
  }

  if (senha !== contaOrigem.senha) {
    return res.status(401).json({ mensagem: "A senha informada é inválida." });
  }

  if (Number(valor) > contaOrigem.saldo) {
    return res
      .status(400)
      .json({ mensagem: "O saldo da conta deve ser maior do que o valor de saque." });
  }

  contaOrigem.saldo -= Number(valor);
  contaDestino.saldo += Number(valor);

  transferencias.push({
    data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    numero_conta_origem,
    numero_conta_destino,
    valor,
  });

  return res.status(204).json();
};

const verificarSaldo = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({
      mensagem: "Todas as informações são obrigatórias",
    });
  }

  const contaEncontrada = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!contaEncontrada) {
    return res
      .status(404)
      .json({ mensagem: "A conta informada não existe." });
  }

  if (senha !== contaEncontrada.senha) {
    return res.status(401).json({ mensagem: "A senha informada é inválida." });
  }

  res.status(200).json({ saldo: contaEncontrada.saldo });
};

const verificarExtrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  if (!numero_conta || !senha) {
    return res.status(400).json({
      mensagem: "Todas as informações são obrigatórias.",
    });
  }

  const contaEncontrada = contas.find((conta) => {
    return conta.numero === Number(numero_conta);
  });

  if (!contaEncontrada) {
    return res
      .status(404)
      .json({ mensagem: "A conta informada não existe." });
  }

  if (senha !== contaEncontrada.senha) {
    return res.status(401).json({ mensagem: "A senha informada é inválida." });
  }

  const depositosConta = depositos.filter((deposito) => {
    return deposito.numero_conta === numero_conta;
  });

  const saquesConta = saques.filter((saque) => {
    return saque.numero_conta === numero_conta;
  });

  const transferenciasEnviadas = transferencias.filter((enviado) => {
    return enviado.numero_conta_origem === numero_conta;
  });

  const transferenciasRecebidas = transferencias.filter((recebido) => {
    return recebido.numero_conta_destino === numero_conta;
  });

  const extrato = {
    depositos: depositosConta,
    saques: saquesConta,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };

  res.status(200).json(extrato);
};

module.exports = {
  depositar,
  sacar,
  transferir,
  verificarSaldo,
  verificarExtrato,
};