angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.viewclassoptions', {
                url: '/viewclassoptions',
                controller: 'ViewClassOptionsCtrl',
                templateUrl: '/app/viewclassoptions/views/viewclassoptions.html',
                resolve: {
                    'Courses': function(Course) {
                        return Course.getAll();
                        //how do we actually get the courses? Raghav?!?!?!
                    }
                }
            });
    });
