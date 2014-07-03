var angularDiagrams = angular.module('angularDiagrams', []);

angularDiagrams.controller('diagramsController', function($scope, $filter, $http) {
    /*
    $scope.trip = {};
    $scope.free = "";
    $scope.username = "";

    var url = window.location.href.split("/");
    var tripId = url[url.length - 1];

    // Cuando se cargue la página se consulta la excursion con ese id
    $http.get('/api/trips/' + String(tripId))
        .success(function(data) {
            $scope.trip = data;
            console.log(data);
            $scope.free = "¡Gratis!";
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    */
    $http.get('/api/user')
        .success(function(data) {
            $scope.username = data;
        })
        .error(function(data){

        });
});

