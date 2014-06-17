var angularTrip = angular.module('angularTrip', []);

function tripController($scope, $http) {
    $scope.trip = {};
    $scope.free = "¡Gratis!";

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

    $scope.precioMayorQueCero = function(){
        return $scope.trip.price > 0;
    };

    $scope.texto = function(){
        if ($scope.trip.price > 0){
            alert("Precio: " + $scope.trip.price);
            return $scope.trip.price;
        }else{
            alert("Gratis");
            return $scope.free;
        }
    }

    $scope.excursionYaPasada = function(fechaActual){

    }
}