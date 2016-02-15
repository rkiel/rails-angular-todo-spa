(function() {
  'use strict';

  angular
  .module('application')
  .controller('LoginController', LoginController);

  LoginController.$inject = ['$log','$location','$mdToast','LoginResource'];

  function LoginController($log,$location,$mdToast,LoginResource) {

    var vm = this;
    vm.email    = '';
    vm.password = '';
    vm.valid = valid;
    vm.create = create;
    vm.cancel = cancel;

    function valid() {
      var vm = this;

      return (vm.email.length > 0 &&
              vm.password.length > 0);
    }

    function create() {
      var vm = this;

      vm.errors = [];

      if (vm.valid()) {

        LoginResource
        .create({
          user: {
            email:                 vm.email,
            password:              vm.password
          }
        })
        .$promise
        .then(function success(signup) {
          $location.path('/todo');
        })
        .catch(function error(err) {
          $log.error(err);
          if (err.status === 401) {
            $mdToast.show($mdToast.simple().textContent('Unable to authenticate.'));
          } else if (500 <= err.status) {
            $mdToast.show($mdToast.simple().textContent('Unable to authenticate.  Services encountered an error.'));
          } else if (err.status < 0) {
            $mdToast.show($mdToast.simple().textContent('Unable to authenticate.  Services are not available.'));
          } else {
            $mdToast.show($mdToast.simple().textContent('Unable to authenticate.'));
          }
        });

      }

    }

    function cancel() {
      $location.path('/');
    }
  }

})();
