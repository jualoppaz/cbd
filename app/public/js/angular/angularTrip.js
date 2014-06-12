var angularTrip = angular.module('angularTrip', []);

function tripController($scope, $http) {
    $scope.excursiones = {};

    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/trips')
        .success(function(data) {
            $scope.excursiones = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}