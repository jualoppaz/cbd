var angularTrip = angular.module('angularTrip', []);

angularTrip.controller('tripController', function($scope, $filter, $http) {
    $scope.trip = {};
    $scope.free = "";
    $scope.username = "";
    $scope.users = {};

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

    $http.get('/api/user')
        .success(function(data) {
            $scope.username = data;
        })
        .error(function(data){

        });

    $http.get('/api/trips/' + String(tripId) + "/users")
        .success(function(data) {
            $scope.users = data.users;
        })
        .error(function(data) {

        });

    $scope.apuntarse = function(){
        $http.post('/api/trips/' + String(tripId) + "/users", {})
            .success(function(data) {


                $scope.users = data.users;
                alert("Ha sido inscrito correctamente. Gracias.");

                /*   OPCION 2: Si no se actualizan los usuarios, podemos realizar una peticion get dentro del post */

                /*
                $http.get('/api/trips/' + String(tripId) + "/users")
                    .success(function(data) {
                        $scope.users = data.users;
                    })
                    .error(function(data) {

                    });*/

            })
            .error(function(data) {
                alert("FAIL: " + data);
            });
    };

    $scope.precioMayorQueCero = function(){
        return $scope.trip.price > 0;
    };
	
    $scope.usuarioInscrito = function(){
        if($scope.users){
            for(var i=0; i<$scope.users.length; i++){
                if($scope.users[i].name == $scope.username){
                    return true;
                }
            }
            return false;
        }
    }

    $scope.excursionRealizada = function(){
        var fechaActual = new Date();

        var diaActual = fechaActual.getDate();
        var mesActual = String(fechaActual.getMonth() + 1);

        if (mesActual<10){
            mesActual = String(0 + mesActual);
        }
        var anyoActual = fechaActual.getFullYear();

        var fechaExcursion = $scope.trip.moment;

        if(typeof fechaExcursion != 'undefined'){
            var diaExcursion = $filter('date') (fechaExcursion, 'dd');
            var mesExcursion = $filter('date') (fechaExcursion, 'MM');
            var anyoExcursion = $filter('date') (fechaExcursion, 'yyyy');

            var fechaActualFiltrada = anyoActual + "/" + mesActual + "/" +diaActual;

            var fechaExcursionFiltrada = anyoExcursion + "/" + mesExcursion + "/" + diaExcursion;

            //alert("Resultado: " + (fechaExcursionFiltrada < fechaActualFiltrada));
            //alert("Fecha actual: " + fechaActualFiltrada);
            //alert("Fecha excursion: " + fechaExcursionFiltrada);

            //opcion 1

            return fechaExcursionFiltrada < fechaActualFiltrada;

            // opcion 2


        }
    };
});
/*
angularTrip.controller('commentController', function($scope, $filter){
    $scope.excursionRealizada = function(){
        alert("Scope de la excursion");
        var fechaActual = new Date();

        var diaActual = fechaActual.getDate();
        var mesActual = fechaActual.getMonth() + 1;
        var anyoActual = fechaActual.getFullYear();

        var fechaExcursion = $('#moment').val();

        if(typeof fechaExcursion != 'undefined'){
            var diaExcursion = $filter('date') (fechaExcursion, 'dd');
            var mesExcursion = $filter('date') (fechaExcursion, 'MM');
            var anyoExcursion = $filter('date') (fechaExcursion, 'yyyy');

            alert("Resultado: " + fechaExcursion < fechaActual);
            alert("Fecha actual: " + fechaActual);
            alert("Fecha excursion: " + fechaExcursion);
            return fechaExcursion < fechaActual;
        }
    };
});*/

