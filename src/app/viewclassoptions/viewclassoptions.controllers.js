angular.module('gg.app')
    .controller('ViewClassOptionsCtrl', function($scope, Courses) {
        $scope.courses = Courses;
    });
