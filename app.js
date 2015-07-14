angular.module('todoApp', [
    'ngSanitize',
    'ui.bootstrap',
]).run(function ($rootScope, $http) {

    $http.defaults.headers.common['X-Parse-Application-ID'] = //Add parse app ID here

    $http.defaults.headers.common['X-Parse-REST-API-Key'] = //Add Parse API key here

});
