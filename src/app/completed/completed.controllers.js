angular.module('gg.app')
    .controller('CompletedCtrl', function($scope, Courses, CompletedCourses) {
        $scope.courses = Courses;
        $scope.completedCourses = CompletedCourses;
        $scope.courseColumns = 3;
        $scope.courseSections = $scope.getSections(_.values(Courses), $scope.courseColumns);

        $scope.selectCourse = function(course) {
            if (CompletedCourses[course.id]) {
                delete CompletedCourses[course.id];
            } else {
                CompletedCourses[course.id] = course;
            }
        }
    });
