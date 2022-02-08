const { LOGIN, SIGNIN, LOGOUT } = require('../constants');
const loginController = require('../controllers/login');

module.exports = (app) => {     
   app.post(LOGIN, loginController.loginUser);
   app.post(SIGNIN, loginController.signInUser);
   app.put(LOGOUT, loginController.logoutUser);
};