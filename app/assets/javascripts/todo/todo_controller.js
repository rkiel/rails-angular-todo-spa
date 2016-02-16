(function() {
  'use strict';

  angular
  .module('application')
  .controller('TodoController', TodoController);

  TodoController.$inject = ['Controller','TodoResource'];

  function TodoController(Controller,TodoResource) {

    var vm = this;
    initialize(vm);
    vm.add    = addItem(TodoResource,vm);
    vm.remove = removeItem(TodoResource,vm);

    loadItems(TodoResource)
    .then(updateItems(vm))
    .catch(Controller.errorNotification(errorMessage));
  }

  function loadItems(TodoResource) {
    return TodoResource
           .index()
           .$promise;
  }

  function errorMessage(err) {
    if (err.status === 401) {
      return 'Unable to authenticate.';
    } else if (500 <= err.status) {
     return  'Unable to authenticate.  Services encountered an error.';
    } else if (err.status < 0) {
      return 'Unable to authenticate.  Services are not available.';
    } else {
      return 'Unable to authenticate.';
    }
  }

  function removeItem(TodoResource,vm) {
    return function(item) {
      TodoResource
      .destroy(item)
      .$promise
      .then(updateItems(vm));
    }
  }

  function addItem(TodoResource,vm) {
    return function() {
      TodoResource
      .create(todoFrom(vm))
      .$promise
      .then(updateItems(vm))
    }
  }

  function updateItems(vm) {
    return function(data) {
      vm.items = data;
      vm.description = '';
      vm.loaded = true;
    };
  }

  function todoFrom(vm) {
    return {
      todo: {
        description: vm.description
      }
    };
  }

  function initialize(vm) {
    vm.items = [];
    vm.description = '';
    vm.loaded = false;
  }

})();
