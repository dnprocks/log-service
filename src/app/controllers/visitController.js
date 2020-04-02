const User = require("../models/user");
const Visit = require("../models/visit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
var faker = require("faker");

const list = async (req, res) => {
  try {
    // const listVisit = await Visit.find();
    const listVisit = getFakeVisits();
    return res.json(listVisit);
  } catch (err) {
    console.log(err);
  }
};

const getFakeVisits = () => {
  faker.locale = "pt_BR";
  const list = new Array();
  for (var i = 0; i < 100; i++) {
    const visit = {
      id: i + 1,
      date: new Date().toLocaleString(),
      serviceOrder: Math.ceil(
                                Math.random() * (999999 - 100000) + 100000
                              ).toString(),
      place: faker.company.companyName(),
      brand: faker.image.avatar(),
      situation: "situation"
    }

    list.push(visit);

  }

  console.log(list);
  return list;
};

// fun createList(size: Long): List<Visit> {
//   val now = LocalDateTime.parse("2020-03-09T00:00:00.000")

//   for (i in 1..size) {
//       val x = Random.nextLong(1, 101)
//       val date = if (x <= 20) {
//           now.minusDays(Random.nextLong(1, 10))
//       } else if (x <= 50) {
//           now
//       } else if (x <= 80) {
//           now.plusDays(1)
//       } else {
//           now.plusDays(Random.nextLong(2, 8))
//       }
//       val serviceOrder = Random.nextInt(100000, 999999).toString()
//       val place = faker.company().name()
//       val situationReady =
//           if (date.toLocalDate().isBefore(LocalDate.parse("2020-03-09"))) {
//               "situation"
//           } else if (date.toLocalDate().isEqual(LocalDate.parse("2020-03-09"))) {
//               val y = Random.nextLong(1, 101)
//               if (y <= 30) {
//                   "situation"
//               } else if (y <= 70) {
//                   "situation"
//               } else {
//                   "situation"
//               }
//           } else {
//               "situation"
//           }
//       val brand = faker.company().logo()

//       list.add(
//           Visit(
//               id = UUID.randomUUID().toString(),
//               date = date,
//               serviceOrder = serviceOrder,
//               place = place,
//               situation = situationReady,
//               brand = brand
//           )
//       )
//   }

//   return list
// }

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
    console.log(error);
    return res.status(400).send({ error: "Falha ao efetuar login" });
  }
}

module.exports = { list };
