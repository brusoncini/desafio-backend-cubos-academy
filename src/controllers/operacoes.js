let {
  numero,
  saldo,
  contas,
  saques,
  depositos,
  transferencias,
  extrato,
} = require("../bancodedados");

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body;

  if (!numero_conta || !valor) {
    return res
      .status(400)
      .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
  }

  const contaExistente = contas.find((conta) => {
    return numero === Number(numero_conta);
  });

  if (!contaExistente) {
    return res.status(400).json({ mensagem: "A conta informada não existe." });
  }

  if(valor <= 0) {
    return res.status(400).json({ mensagem: "Não é permitido depositar um valor negativo ou igual a zero." });
  }

  conta.saldo += valor

  res.status(204).send();
};

const sacar = (req, res) => {
    
}
const transferir = (req, res) => {}
const verificarSaldo = (req, res) => {}
const tirarExtrato = (req, res) => {}

module.exports = { depositar, sacar, transferir, verificarSaldo, tirarExtrato };
