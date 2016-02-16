(function() {
  'use strict';

  angular
  .module('application')
  .factory('TodoResource', TodoResource);

  TodoResource.$inject = ['$resource'];

  function TodoResource($resource) {
    return $resource('/api/todo/:id', {id: '@id', format: 'json'}, {
      'create':  { method: 'POST', isArray: true },
      'index': { method: 'GET', isArray: true }
    });
  }

})();
