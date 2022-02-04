const loginController = require('../controllers/login');

module.exports = (app) => {     
   app.post('/login', loginController.loginUser);
   app.post('/signin', loginController.signInUser);
   app.patch('/logout', loginController.logoutUser);
};