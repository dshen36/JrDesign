angular.module('gg.app')
    .controller('SelectionCtrl', function($scope, Courses, CompletedCourses, AvailableCourses) {
        $scope.courses = Courses;
        $scope.availableCourses = AvailableCourses;
    });
