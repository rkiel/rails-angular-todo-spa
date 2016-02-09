(function() {
  'use strict';

  angular
  .module('application')
  .factory('SignupResource', SignupResource);

  SignupResource.$inject = ['$resource'];

  function SignupResource($resource) {
    return $resource('/api/signup/:id', {id: '@id', format: 'json'}, {
      'create':  { method: 'POST' },
    });
  }

})();
