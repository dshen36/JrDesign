angular.module('gg.app')
    .controller('CompletedCtrl', function($scope, Courses) {
        $scope.courses = Courses;
    });
