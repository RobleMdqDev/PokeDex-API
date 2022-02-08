const { ID_USER, LIST_USER, NAME_USER } = require('../constants');
const usersController = require('../controllers/users');

module.exports = (app) => {      
   app.put(ID_USER, usersController.updateUser);
   app.get(LIST_USER, usersController.listUsers);
   app.get(NAME_USER, usersController.findUser);
   app.delete(ID_USER, usersController.deleteUser);   
};