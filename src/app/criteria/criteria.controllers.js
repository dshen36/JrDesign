angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, Majors, Minors) {
        $scope.majors = Majors;
        $scope.minors = Minors;
    });
