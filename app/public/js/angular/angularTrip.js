var angularTrip = angular.module('angularTrip', []);

function tripController($scope, $http) {
    $scope.trip = {};

    var url = window.location.href.split("/");
    var tripId = url[url.length - 1];

    // Cuando se cargue la página se consulta la excursion con ese id
    $http.get('/api/trips/' + String(tripId))
        .success(function(data) {
            $scope.trip = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}