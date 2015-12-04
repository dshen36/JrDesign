angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.completed', {
                url: '/completed',
                controller: 'CompletedCtrl',
                templateUrl: '/app/completed/completed.html',
                resolve: {
                    'CompletedCourses': function(Me) {
                        return Me.getCompletedCourses();
                    }
                }
            });
    });
