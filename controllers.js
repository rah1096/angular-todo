angular.module("todoApp").controller('todoCtrl', ['$scope', '$q', '$modal', 'todoFactory', function ($scope, $q, $modal, todoFactory) {
    $scope.todoFactory = todoFactory;
    $scope.todoItems = [];
    $scope.title = '';
    $scope.description = '';
    $scope.getTodoItems = function () {
        $scope.todoFactory.APIGetTodoItems().then(function (data) {
            $scope.todoItems = data['results'];
        });
    };

    $scope.saveTodoItem = function () {
        $scope.todoFactory.APISaveTodo({
            title: $scope.todoItem.title,
            description: $scope.todoItem.description,
            startTime: {
                "__type": "Date",
                "iso": $scope.todoItem.startTimeHourMin
            },
            endTime: {
                "__type": "Date",
                "iso": $scope.todoItem.endTimeHourMin
            }

        }).then(function (data) {
            $scope.todoItem = {
                "createdAt": "",
                "description": "",
                "endTime": {
                    "__type": "Date",
                    "iso": ""
                },
                "objectId": "",
                "startTime": {
                    "__type": "",
                    "iso": ""
                },
                "title": "",
                "updatedAt": "",
                "startTimeHourMin": new Date(),
                "endTimeHourMin": new Date()
            };

            $scope.cancelModal();
            $scope.getTodoItems();
        });
    };

    $scope.updateTodoItem = function () {
        $scope.todoFactory.APIUpdateTodo({
            title: $scope.todoItem.title,
            description: $scope.todoItem.description,
            startTime: {
                "__type": "Date",
                "iso": $scope.todoItem.startTimeHourMin
            },
            endTime: {
                "__type": "Date",
                "iso": $scope.todoItem.endTimeHourMin
            }
        }, $scope.todoItem.objectId).then(function (data) {
            $scope.todoItem = {

                "createdAt": "",
                "description": "",
                "endTime": {
                    "__type": "Date",
                    "iso": ""
                },
                "objectId": "",
                "startTime": {
                    "__type": "",
                    "iso": ""
                },
                "title": "",
                "updatedAt": "",
                "startTimeHourMin": new Date(),
                "endTimeHourMin": new Date()
            };

            $scope.cancelModal();
            $scope.getTodoItems();
        });
    };
    $scope.deleteTodoItem = function (todoItem) {
        $scope.todoFactory.APIDeleteTodo(todoItem.objectId).then(function (data) {
            $scope.getTodoItems();
        });
    };


    $scope.convertDateTime = function (datetime) {
        if (_.isUndefined(datetime) || _.isNull() || _.isEmpty(datetime)) {
            return 'n/a';
        }
        else {
            return moment(datetime).format("MMM Do YYYY, h:mm a");
        }
    };

    $scope.todoModal = function () {
        $scope.addTodoButton = true;
        $scope.saveTodoButton = false;
        $scope.todoItem = {

            "createdAt": "",
            "description": "",
            "endTime": {
                "__type": "Date",
                "iso": ""
            },
            "objectId": "",
            "startTime": {
                "__type": "",
                "iso": ""
            },
            "title": "",
            "updatedAt": "",
            "startTimeHourMin": new Date(),
            "endTimeHourMin": new Date()
        };

        $scope.todoModalInstance = $modal.open({
            templateUrl: 'todoModal.html',
            scope: $scope,
            windowClass: ''
        });


    };

    $scope.editTodoModal = function (todoItem) {
        $scope.addTodoButton = false;
        $scope.saveTodoButton = true;
        $scope.todoItem = todoItem;
        $scope.todoItem.startTimeHourMin = _.isUndefined(todoItem.startTime) || _.isNull(todoItem.startTime) ? '' : todoItem.startTime.iso,
        $scope.todoItem.endTimeHourMin = _.isUndefined(todoItem.endTime) || _.isNull(todoItem.endTime) ? '' : todoItem.endTime.iso;

        $scope.todoModalInstance = $modal.open({
            templateUrl: 'todoModal.html',
            scope: $scope,
            windowClass: ''
        });


    };

    $scope.timeChanged = function () {
        if (moment($scope.todoItem.endTimeHourMin).utc() < moment($scope.todoItem.startTimeHourMin).utc()) {
            $scope.addAlert({type: 'danger', msg: 'End time must be greater than start time.'});
        }
        else {
            $scope.alerts = [];
        }
    };

    $scope.cancelModal = function () {
        $scope.todoModalInstance.dismiss('cancel');
    };
    $scope.hstep = 1;
    $scope.mstep = 1;
    $scope.isAmPM = true;

    $scope.alerts = [];

    $scope.addAlert = function (alert) {
        $scope.alerts = [];
        $scope.alerts.push(alert);
    };

    $scope.closeAlert = function (index) {
        $scope.alerts = [];
    };

    $scope.getTodoItems();

    /**
     * watcher code
     */
    $scope.watchCount = 0;

    $scope.$watch(
        function watchCountExpression() {
            return ( $scope.todoFactory.getWatchCount() );
        },
        function handleWatchCountChange(newValue) {
            $scope.watchCount = newValue;
        }
    );
}]);
