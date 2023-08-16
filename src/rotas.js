const express = require("express");
const {
  listarContas,
  criarConta,
  atualizarConta,
  excluirConta,
} = require("./controllers/contas");
const {validarSenha} = require('./intermediarios');

const rotas = express();

// CRUD contas
rotas.use(validarSenha);
rotas.get("/contas", listarContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarConta);
rotas.delete("/contas/:numeroConta", excluirConta);

// operações da conta
// rotas.post("/transacoes/depositar", depositar);
// rotas.post("/transacoes/sacar", sacar);
// rotas.post("/transacoes/transferir", transferir);
// rotas.get("/contas/saldo?numero_conta=123&senha=123", saldo);
// rotas.get("/contas/extrato?numero_conta=123&senha=123", extrato);

module.exports = rotas;
