const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth")

const register = async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Usuário já existe" });
    }
    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).getTime().toString(),
      token: generateToken({ id: user.id }, res)
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Falha ao registar usuário", exception: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ error: "Usuário não encontrado" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: "Usuário ou senha inválidos" });
  }

  user.password = undefined;

  return res.send({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).getTime().toString(),
    token: generateToken({ id: user.id }, res)
  });

  
};

function generateToken(params = {}, res) {
  try {
    var token = jwt.sign(params, authConfig.secret, {
      expiresIn: 86400
    });
    return token;
  } catch (error) {
      console.log(error)
    return res.status(400).send({ error: "Falha ao efetuar login" });
  }
}

module.exports = { register, login };
