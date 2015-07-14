angular.module("todoApp").factory("todoFactory", ['$http', '$q', function ($http, $q) {
    var factory = {};
    factory.APISaveTodo = function (options) {
        var d = $q.defer();
        var defaults = {
            title: '',
            description: ''
        };

        $http.post("https://api.parse.com/1/classes/Todo", _.extend(defaults, options)).success(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).error(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).finally(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        });
        return d.promise;
    };

    factory.APIUpdateTodo = function (options, objectId) {
        var d = $q.defer();
        $http.put("https://api.parse.com/1/classes/Todo/" + objectId, options).success(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).error(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).finally(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        });
        return d.promise;
    };

    factory.APIDeleteTodo = function (objectId) {
        var d = $q.defer();
        $http.delete("https://api.parse.com/1/classes/Todo/" + objectId).success(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).error(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).finally(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        });
        return d.promise;
    };

    factory.APIGetTodoItems = function (options) {
        var d = $q.defer();
        var defaults = {};
        $http.get("https://api.parse.com/1/classes/Todo", {params: _.extend(defaults, options)}).success(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).error(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        }).finally(function (data, status, headers, config) {
            d.resolve(data, status, headers, config);
        });
        return d.promise;
    };

    factory.getWatchCount = function () {
          var total = 0;
            angular.element(".ng-scope").each(
                function ngScopeIterator() {
                    var scope = $(this).scope();
                    total += scope.$$watchers
                        ? scope.$$watchers.length
                        : 0
                    ;

                }
            );
            return ( total );
    };
    return factory;

}]);

