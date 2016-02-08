(function() {
  'use strict';

  angular
  .module('application')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['$log','$location'];

  function SignupController($log,$location) {

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

      if (vm.valid()) {

      }

    }

    function cancel() {
      $location.path('/#/');
    }
  }

})();

