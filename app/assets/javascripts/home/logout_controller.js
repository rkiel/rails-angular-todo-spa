(function() {
  'use strict';

  angular
  .module('application')
  .controller('LogoutController', LogoutController);

  LogoutController.$inject = ['Controller','LoginResource'];

  function LogoutController(Controller,LoginResource) {

    var vm = this;

    destroyLogin(LoginResource,vm)
    .then(Controller.redirectToHome)
    .catch(Controller.errorNotification(errorMessage));
  }

  function destroyLogin(LoginResource, vm) {
    return LoginResource
           .destroy({ })
           .$promise;
  }

  function errorMessage(err) {
    if (500 <= err.status) {
      return 'Unable to logout.  Services encountered an error.';
    } else if (err.status < 0) {
      return 'Unable to logout.  Services are not available.';
    } else {
      return 'Unable to logout.';
    }
  }

})();
