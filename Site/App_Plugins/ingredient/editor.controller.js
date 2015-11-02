/// <reference path="highcharts.min.js" />
angular.module("umbraco")
	.controller("My.IngredientController", function($scope, ingredientResource, assetsService){
			
	    console.log('Yep, we are in My.IngredientController');

	    //Lazy load JSpie char lib
	    assetsService.loadJs("/App_Plugins/ingredient/highcharts.min.js").then(function () {


	        $scope.ingredients = ingredientResource.getAll();
	        console.log("ingredients:");
	        console.log($scope.ingredients);

	        $scope.find = function (event, term) {
	            if (term !== "") {
	                $scope.ingredients = ingredientResource.search(term);
	            } else {
	                $scope.ingredients = undefined;
	            }
	        };


	        if (!angular.isArray($scope.model.value)) {
	            $scope.model.value = [];
	        }
	        $scope.select = function (ingredient) {
	            $scope.model.value.push(ingredient);
	        };

	        $scope.remove = function (index) {
	            $scope.model.value.splice(index, 1);
	        }


	        $scope.ingredients = ingredientResource.getAll();
	        //notice how throlled find is a parameter-less function
	        //but we can still pass in $scope.searchTerm
	        /*
            $scope.throttledFind = _.throttle(function(){
                    if ($scope.searchTerm !== "") {
                        $scope.ingredients = ingredientResource.search($scope.searchTerm);
                    } else {
                        $scope.ingredients = undefined;
                    }
            },500);
            */


            //Configure chart
	        $scope.renderChart = function () {

	            //Collect an array from the model.value
	            var data = [];

	            console.log('Data:');
	            console.log(data);
	            console.log("I love Anna, very much!")

	            _.forEach($scope.model.value, function (ing) {
	                //Only add if ingredient has a percentage
	                if (ing.percentage) {
	                    data.push([ing.name, ing.percentage]);
	                }
	            });

	            

	            $('#container')
                    .highcharts({
                        series: [{
                            type: 'pie',
                            data: data
                        }]
                    });
	        };

	        //Render chart
	        $scope.$watch("model.value", function () {
	                $scope.renderChart();
	            },
                true
            );

	    });
	});
