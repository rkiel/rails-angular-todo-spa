(function() {
  'use strict';

  angular
  .module('application')
  .controller('TodoController', TodoController);

  TodoController.$inject = ['$log','$location','TodoResource'];

  function TodoController($log,$location,TodoResource) {

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
      $location.path('/login');
    });

  }

})();
