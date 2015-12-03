angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.selection', {
                url: '/selection',
                controller: 'SelectionCtrl',
                templateUrl: '/app/selection/selection.html',
                resolve: {
                    'CompletedCourses': function(Me) {
                        return Me.getCompletedCourses();
                    },
                    'AvailableCourses': function(Course, Courses, CompletedCourses) {
                        return Course.getAvailableCourses(CompletedCourses);
                    }
                }
            });
    });
