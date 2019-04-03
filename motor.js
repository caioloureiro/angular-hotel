var hotelMOTOR = angular.module('hotelMOTOR', ['ngRoute']);

hotelMOTOR.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl:'home.html'
	}).when('/principal',{
		templateUrl:'principal.html',
		controller:'hotelController'
	}).otherwise({
		redirectTo:'/principal'
	});
}]);

hotelMOTOR.controller('hotelController', ['$scope', '$http', function($scope, $http){
	
	$scope.remove = function(hospede){
		var remove = $scope.hospedes.indexOf(hospede);
		$scope.hospedes.splice(remove, 1);
	};
	
	$scope.add = function(){
		
		$scope.entrada = new Date($scope.newhospede.dataEntrada);
		$scope.saida = new Date($scope.newhospede.dataSaida);
		var weekday = [];
			weekday[0] = "Monday";
			weekday[1] = "Tuesday";
			weekday[2] = "Wednesday";
			weekday[3] = "Thursday";
			weekday[4] = "Friday";
			weekday[5] = "Saturday";
			weekday[6] =  "Sunday";
		$scope.entradaCALC = weekday[$scope.entrada.getDay()];
		$scope.saidaCALC = weekday[$scope.saida.getDay()];
		
		var tempo = $scope.saida - $scope.entrada;
		
		if(tempo > 86400000){var multa = 120}else{var multa = 0}
		
		console.log(multa);
		
		if($scope.entradaCALC == 'Saturday' || $scope.entradaCALC == 'Sunday'){
			var weekend = 30
			if($scope.newhospede.adicionalVeiculo == true){var carro = 20}else{var carro = 0}
		}else{
			var weekend = 0
			if($scope.newhospede.adicionalVeiculo == true){var carro = 15}else{var carro = 0}
		}
		
		var valorFINAL = 120 + carro + weekend + multa;
		
		$scope.hospedes.push({
			nome: $scope.newhospede.nome,
			documento: parseInt($scope.newhospede.documento),
			telefone: parseInt($scope.newhospede.telefone),
			dataEntrada: $scope.newhospede.dataEntrada,
			dataSaida: $scope.newhospede.dataSaida,
			adicionalVeiculo: $scope.newhospede.adicionalVeiculo,
			total: valorFINAL
		});
		
		$scope.newhospede.nome = "";
		$scope.newhospede.documento = "";
		$scope.newhospede.telefone = "";
		$scope.newhospede.dataEntrada = "";
		$scope.newhospede.dataSaida = "";
		$scope.newhospede.adicionalVeiculo = false;
	};
	
	$http.get('hospede.json').then(function(response){
		
		var data = response.data;
		var config = response.config;

		$scope.hospedes = data;
		console.log(angular.toJson($scope.hospedes));
	});
	
}]);