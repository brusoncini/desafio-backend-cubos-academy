const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query;

  if (!senha_banco) {
    return res.status(403).json({ mensagem: "É necessário informar a senha!" });
  }
  if (senha_banco !== "Cubos123Bank") {
    return res
      .status(403)
      .json({ mensagem: "A senha do banco informada é inválida!" });
  }

  next();
};

module.exports = { validarSenha };
