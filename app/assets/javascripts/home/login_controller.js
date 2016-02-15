(function() {
  'use strict';

  angular
  .module('application')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['Controller','LoginResource'];

  function LoginController(Controller,LoginResource) {

    var vm = this;
    initialize(vm);
    vm.valid  = valid;
    vm.create = create;
    vm.cancel = cancel;

    function valid() {
      var vm = this;

      return isValid(vm);
    }

    function create() {
      var vm = this;

      if (isValid(vm)) {
        loginUser(LoginResource,vm)
        .then(Controller.redirectToTodo)
        .catch(Controller.errorNotification(errorMessage));
      }
    }

    function cancel() {
      var vm = this;

      Controller.redirectToHome();
    }
  }

  function loginUser(LoginResource,vm) {
    return LoginResource
          .create(userFrom(vm))
          .$promise;
  }

  function errorMessage(err) {
    if (err.status === 401) {
      return 'Unable to authenticate.';
    } else if (500 <= err.status) {
     return  'Unable to authenticate.  Services encountered an error.';
    } else if (err.status < 0) {
      return 'Unable to authenticate.  Services are not available.';
    } else {
      return 'Unable to authenticate.';
    }
  }

  function isValid(vm) {
    return (vm.email.length > 0 &&
            vm.password.length > 0);
  }

  function userFrom(vm) {
    return {
      user: {
        email:    vm.email,
        password: vm.password
      }
    };
  }

  function initialize(vm) {
    vm.email    = '';
    vm.password = '';
  }

})();
