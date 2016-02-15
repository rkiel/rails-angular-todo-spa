(function() {
  'use strict';

  angular
  .module('application')
  .controller('TodoController', TodoController);

  TodoController.$inject = ['Controller','TodoResource'];

  function TodoController(Controller,TodoResource) {

    var vm = this;
    vm.items = [];

    TodoResource
    .index()
    .$promise
    .then(function success(items) {
      vm.items = items;
    })
    .catch(function error(err) {
      $log.error(err);
      Controller.redirectToLogin();
    });

  }

})();
