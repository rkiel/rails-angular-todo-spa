(function() {
  'use strict';

  angular
  .module('application')
  .controller('LogoutController', LogoutController);

  LogoutController.$inject = ['$log','$location','$mdToast','LoginResource'];

  function LogoutController($log,$location,$mdToast,LoginResource) {

    var vm = this;

    LoginResource
    .destroy({
    })
    .$promise
    .then(function success(signup) {
      $location.path('/#/');
    })
    .catch(function error(err) {
      $log.error("start");
      $log.error(err);
      $log.error("end");
      if (500 <= err.status) {
        $mdToast.show($mdToast.simple().textContent('Unable to logout.  Services encountered an error.'));
      } else if (err.status < 0) {
        $mdToast.show($mdToast.simple().textContent('Unable to logout.  Services are not available.'));
      } else {
        $mdToast.show($mdToast.simple().textContent('Unable to logout.'));
      }
    });

  }

})();
