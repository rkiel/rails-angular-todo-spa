(function() {
  'use strict';

  angular
  .module('application')
  .factory('Controller', Controller);

  Controller.$inject = ['$log','$location','$mdToast'];

  function Controller($log, $location, $mdToast) {

    function errorNotification(errorMessage) {
      return function(err) {
        logErrorMessage($log,err);
        flashErrorMessage($mdToast,errorMessage(err));
      }
    }

    function redirectToLogin() {
      redirectToPath($location,'/login');
    }

    function redirectToTodo() {
      redirectToPath($location,'/todo');
    }

    function redirectToHome() {
      redirectToPath($location,'/');
    }

    return {
      errorNotification: errorNotification,
      redirectToLogin:   redirectToLogin,
      redirectToTodo:    redirectToTodo,
      redirectToHome:    redirectToHome
    };
  }

  function flashErrorMessage($mdToast,msg) {
    $mdToast.show($mdToast.simple().textContent(msg));
  }

  function logErrorMessage($log,err) {
    $log.error(err);
  }

  function redirectToPath($location,path) {
    $location.path(path);
  }

})();
