angular.module('gg.app')
    .controller('AppCtrl', function($scope, Environment) {
        $scope.hello = 'Hello World!';
        $scope.env = Environment.name;
    });
