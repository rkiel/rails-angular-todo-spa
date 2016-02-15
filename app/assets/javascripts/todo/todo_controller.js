(function() {
  'use strict';

  angular
  .module('application')
  .controller('TodoController', TodoController);

  TodoController.$inject = ['$log'];

  function TodoController($log) {

    var vm = this;

    $log.info("TodoController");
  }

})();

