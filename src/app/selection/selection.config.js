angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.selection', {
                url: '/selection',
                controller: 'SelectionCtrl',
                templateUrl: '/app/selection/selection.html',
                resolve: {
                    'Courses': function(Me, Course) {
                        return Course.getAll(Me);
                    },
                    'CompletedCourses': function(Me) {
                        return Me.getCompletedCourses();
                    },
                    'AvailableCourses': function(Course, Courses, CompletedCourses) {
                        return Course.getAvailableCourses(CompletedCourses);
                    }
                }
            });
    });
