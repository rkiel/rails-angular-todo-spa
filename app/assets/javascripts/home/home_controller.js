(function() {
  'use strict';

  angular
  .module('application')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['$log'];

  function HomeController($log) {

    var vm = this;

    $log.info("HomeController");
  }

})();

