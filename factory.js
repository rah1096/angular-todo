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

            // AngularJS denotes new scopes in the HTML markup by appending the
            // class "ng-scope" to appropriate elements. As such, rather than
            // attempting to navigate the hierarchical Scope tree, we can simply
            // query the DOM for the individual scopes. Then, we can pluck the
            // watcher-count from each scope.
            // --
            // NOTE: Ordinarily, it would be a HUGE SIN for an AngularJS service
            // to access the DOM (Document Object Model). But, in this case,
            // we're not really building a true AngularJS service, so we can
            // break the rules a bit.
            angular.element(".ng-scope").each(
                function ngScopeIterator() {

                    // Get the scope associated with this element node.
                    var scope = $(this).scope();

                    // The $$watchers value starts out as NULL.
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

