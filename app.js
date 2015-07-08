angular.module('todoApp', [
    'ngSanitize',
    'ui.bootstrap',
]).run(function ($rootScope, $http) {

    $http.defaults.headers.common['X-Parse-Application-ID'] = "UYxBK5rYMjBD9M7aPUWbEE5p1Y5hi9NDOPFzuMry"

    $http.defaults.headers.common['X-Parse-REST-API-Key'] = "48P2hQNg2LL1KHfNacb7q3GjzjEzCVt4WgrpNRev"

});
