(function() {
  'use strict';

  angular
  .module('application')
  .controller('AwayController', AwayController);

  AwayController.$inject = ['$log'];

  function AwayController($log) {

    var vm = this;

    $log.info("AwayController");
  }

})();

