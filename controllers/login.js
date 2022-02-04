const jwt = require("jsonwebtoken");
const { findUser, createUser } = require("./users");
const bcrypt = require('bcrypt');



exports.loginUser = async (req, res) => {
  
    try {
      const { username, password } = req.body;
      console.log('user data: ', username, password)
      const user = await findUser(req , res , username);
     
      if (!user) {
        res.status(400).send('No existe el usuario');         
      }
    const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        res.status(400).send('Password incorrecto');
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
    user = await createUser(req, res)
    
    const token = getToken(user.dataValues.id);
    
    res.json({ status: "OK", user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
const getToken = (id) => jwt.sign({ id }, 'poke_secret', { expiresIn: '2h' });
  
 
exports.logoutUser = (req, res) => {

  const authHeader = req.headers["authorization"];

  jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
     if (logout) {
        res.status(200).send('Has sido desconectado');
     } else {
        res.status(400).send('Error');
     }
  });

};

