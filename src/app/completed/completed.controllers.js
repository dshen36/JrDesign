angular.module('gg.app')
    .controller('CompletedCtrl', function($scope, Courses) {
        debugger;
        $scope.courses = [];

        for (courseId in Courses) {
            if (Courses.hasOwnProperty(courseId)) {
                $scope.courses.push({ course: Courses[courseId], selected: false });
            }
        }

        $scope.toggleCourse = function(course) {
            course.selected = !course.selected;
        }
    });
