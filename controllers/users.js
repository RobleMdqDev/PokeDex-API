const users = require("../models").users;
const bcrypt = require('bcrypt');
const { USER_EXIST, USER_NOT_EXIST } = require("../constants");

exports.createUser = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
try {
  const user = await this.findUser(req, res, req.body.username)
  
  if (user) throw new Error(USER_EXIST);

  return users
    .create({
      username: req.body.username,
      password: hash,
      // team: '',
      // avatar: '0'
    })
    .then((data) => data)
    

} catch (error) { 
    throw new Error(error.message)
}}
  

exports.listUsers = (_, res) => {
  return users
    .findAll({})
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(400).send(error));
};

exports.findUser = async (req, res, usernameLogin) => {
  const nameuser = req.params.username || usernameLogin
 
  try {
    return await users.findOne({
      where: {
        username: nameuser,
      },
      })
        .then((users) => {
        
        

        if(req.params.username){         
          if(users === null) res.status(400).send(USER_NOT_EXIST)
          res.status(200).send(users.dataValues);
        } else{   
          if(users === null) return null;       
          return users.dataValues;
        }
               
      })
    
  }catch(error){    
      throw new Error(error.message);
  }
    
};

exports.updateUser = (req, res) => {
  return users
    .update(
      {
        ...req.body,
      },
      {
        where: {
          id: parseInt(req.params.id),
        },
      }
    )
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(400).send(error));
};

exports.deleteUser = (req, res) => {
    return users
      .destroy(
        {
          where: {
            id: parseInt(req.params.id),
          }
        }
      )
      .then((users) => res.send(200).send(users))
      .catch((error) => res.send(400).send(error));
  };

 
