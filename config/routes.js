/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'POST /register' : 'AuthController.register',
  'POST /login' : 'AuthController.login',
  'GET /user' : 'AuthController.user',

  'POST /unit/nearby' : 'UnitController.nearby',
  'POST /unit/search' : 'UnitController.search',
  'GET /unit/detail/:id' : 'UnitController.detail',

  'POST /location/address' : 'LocationController.address',

  //'GET /test' : 'TestController.test',
};
