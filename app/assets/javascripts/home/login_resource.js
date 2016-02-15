(function() {
  'use strict';

  angular
  .module('application')
  .factory('LoginResource', LoginResource);

  LoginResource.$inject = ['$resource'];

  function LoginResource($resource) {
    return $resource('/api/login/:id', {id: '@id', format: 'json'}, {
      'create':  { method: 'POST' },
      'destroy': { method: 'DELETE' }
    });
  }

})();
