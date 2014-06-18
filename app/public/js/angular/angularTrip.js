var angularTrip = angular.module('angularTrip', []);

angularTrip.controller('tripController', function($scope, $filter, $http) {
    $scope.trip = {};
    $scope.free = "";

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

    $scope.precioMayorQueCero = function(){
        //alert("Funcion del precio");
        return $scope.trip.price > 0;
    };

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

