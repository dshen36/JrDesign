angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.criteria', {
                url: '',
                controller: 'CriteriaCtrl',
                templateUrl: '/app/criteria/criteria.html',
                resolve: {
                    'Majors': function(Major) {
                        return Major.getAll();
                    },
                    'Minors': function(Minor) {
                        return Minor.getAll();
                    }
                }
            });
    });
