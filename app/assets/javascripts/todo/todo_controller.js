(function() {
  'use strict';

  angular
  .module('application')
  .controller('TodoController', TodoController);

  TodoController.$inject = ['Controller','TodoResource'];

  function TodoController(Controller,TodoResource) {

    var vm = this;
    initialize(vm);
    vm.add = add(TodoResource,vm);
    vm.remove = remove(TodoResource,vm);

    loadItems(TodoResource)
    .then(updateItems(vm))
    .catch(Controller.errorNotification(errorMessage));
  }

  function loadItems(TodoResource) {
    return TodoResource
           .index()
           .$promise;
  }

  function updateItems(vm) {
    return function(items) {
      vm.loaded = true;
      vm.items = items;
    };
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

  function remove(TodoResource,vm) {
    return function(item) {
      TodoResource
      .destroy(item)
      .$promise
      .then(function success(data) {
         vm.items = data;
      });
    }
  }

  function add(TodoResource,vm) {
    return function() {
      TodoResource
      .create({
        todo: {
          description: vm.description
        }
      })
      .$promise
        .then(function success(data) {
          vm.items = data;
        });
      vm.description = '';
    }
  }

  function initialize(vm) {
    vm.items = [];
    vm.loaded = false;
    vm.description = '';
  }

})();
