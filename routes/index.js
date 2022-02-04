const usersController = require('../controllers/users');

module.exports = (app) => {      
   app.put('/users/:id', usersController.updateUser);
   app.get('/users/list', usersController.listUsers);
   app.get('/users/:username', usersController.findUser);
   app.delete('/users/:id', usersController.deleteUser);   
};