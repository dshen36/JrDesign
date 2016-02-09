angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.criteria', {
                url: '',
                controller: 'CriteriaCtrl',
                templateUrl: '/app/criteria/views/criteria.html',
                abstract: true
            })
            .state('app.criteria.major', {
                url: '',
                controller: 'CriteriaMajorCtrl',
                templateUrl: '/app/criteria/views/criteria.major.html',
                resolve: {
                    'Majors': function(Major) {
                        return Major.getAll();
                    }
                }
            })
            .state('app.criteria.tracks', {
                url: '/tracks',
                controller: 'CriteriaTracksCtrl',
                templateUrl: '/app/criteria/views/criteria.tracks.html'
            })
            .state('app.criteria.minor', {
                url: '/minor',
                controller: 'CriteriaMinorCtrl',
                templateUrl: '/app/criteria/views/criteria.minor.html',
                resolve: {
                    'Minors': function(Minor) {
                        return Minor.getAll();
                    }
                }
            });
    });
