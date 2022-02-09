const jwt = require("jsonwebtoken");
const { findUser, createUser } = require("./users");
const bcrypt = require("bcrypt");
const {
  USER_NOT_EXIST,
  INCORRECT_PASSWORD,
  SECRET,
  YOU_DISCONNECTED,
  USER_EXIST,
} = require("../constants");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUser(req, res, username);

    if (!user) {
      res.send({ message: USER_NOT_EXIST });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.send({
        message: INCORRECT_PASSWORD,
      });
    }

    const token = getToken(user.id);

    res.json({ status: "OK", user, token });
  } catch (error) {
    res.json({
      error: error.message,
      status: 500,
    });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.send({ message: USER_NOT_EXIST });
    }
    if (!password) {
      return res.send({ message: INCORRECT_PASSWORD });
    }
    const userFind = await findUser(req, res, username);
    if (userFind) {
      return res.send({ message: USER_EXIST });
    }
    const newUser = await createUser(req, res);   

    const token = getToken(newUser.dataValues.id);

    const user = await findUser(req, res, username);
    
    res.json({ status: "OK", user, token });
  } catch (error) {
    res.send({ message: error.message, status: 400 });
  }
};

const getToken = (id) => jwt.sign({ id }, SECRET, { expiresIn: "2h" });

exports.logoutUser = (req, res) => {
  const authHeader = req.headers["authorization"];

  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    res.status(200).send({ message: YOU_DISCONNECTED });
  });
};
