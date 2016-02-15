(function() {
  'use strict';

  angular
  .module('application')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['Controller','SignupResource'];

  function SignupController(Controller,SignupResource) {

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
        createUser(SignupResource,vm)
        .then(Controller.redirectToLogin)
        .catch(Controller.errorNotification(errorMessage))
      }
    }

    function cancel() {
      var vm = this;

      Controller.redirectToHome();
    }
  }

  function createUser(SignupResource,vm) {
    return SignupResource
          .create(userFrom(vm))
          .$promise;
  }

  function errorMessage(err) {
    if (err.status === 409) {
      return 'Unable to create.  Email already in use.';
    } else if (500 <= err.status) {
      return 'Unable to create.  Services encountered an error.';
    } else if (err.status < 0) {
      return 'Unable to create.  Services are not available.';
    } else {
      return 'Unable to create.';
    }
  }

  function isValid(vm) {
    return (vm.first.length > 0 &&
            vm.last.length  > 0 &&
            vm.email.length > 0 &&
            vm.password.length > 0 &&
            vm.password_confirmation.length > 0 &&
            vm.password === vm.password_confirmation);
  }

  function userFrom(vm) {
    return {
      user: {
        first:                 vm.first,
        last:                  vm.last,
        email:                 vm.email,
        password:              vm.password,
        password_confirmation: vm.password_confirmation
      }
    };
  }

  function initialize(vm) {
    vm.first                 = '';
    vm.last                  = '';
    vm.email                 = '';
    vm.password              = '';
    vm.password_confirmation = '';
  }

})();

