(function() {
  'use strict';

  angular
  .module('application')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['$log','$location','$mdToast','SignupResource'];

  function SignupController($log,$location,$mdToast,SignupResource) {

    var vm = this;
    vm.first    = '';
    vm.last     = '';
    vm.email    = '';
    vm.password = '';
    vm.password_confirmation = '';
    vm.valid = valid;
    vm.create = create;
    vm.cancel = cancel;

    function valid() {
      var vm = this;

      return (vm.first.length > 0 &&
              vm.last.length  > 0 &&
              vm.email.length > 0 &&
              vm.password.length > 0 &&
              vm.password_confirmation.length > 0 &&
              vm.password === vm.password_confirmation);
    }

    function create() {
      var vm = this;

      vm.errors = [];

      if (vm.valid()) {

        SignupResource
        .create({user: {
          first:                 vm.first,
          last:                  vm.last,
          email:                 vm.email,
          password:              vm.password,
          password_confirmation: vm.password_confirmation
        }})
        .$promise
        .then(function success(signup) {
          $location.path('/#/login');
        })
        .catch(function error(err) {
          $log.error(err);
          if (err.status === 409) {
            $mdToast.show($mdToast.simple().textContent('Unable to create.  Email already in use.'));
          } else if (500 <= err.status) {
            $mdToast.show($mdToast.simple().textContent('Unable to create.  Services encountered an error.'));
          } else if (err.status < 0) {
            $mdToast.show($mdToast.simple().textContent('Unable to create.  Services are not available.'));
          } else {
            $mdToast.show($mdToast.simple().textContent('Unable to create.'));
          }
        });

      }

    }

    function cancel() {
      $location.path('/#/');
    }
  }

})();

