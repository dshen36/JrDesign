angular.module('gg.app')
    .controller('ErrorCtrl', function($scope, $stateParams) {
        $scope.error = $stateParams.error;
    });
