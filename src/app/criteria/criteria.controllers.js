angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope) {
        $scope.wizardConfig = {
            steps: [
                {
                    name: 'Majors',
                    state: 'app.criteria.majors'
                },
                {
                    name: 'Tracks',
                    state: 'app.criteria.tracks'
                },
                {
                    name: 'Minors',
                    state: 'app.criteria.minors'
                }
            ]
        };
    })
    .controller('CriteriaMajorsCtrl', function($scope, $state, CurrentUser, Majors) {
    })
    .controller('CriteriaTracksCtrl', function($scope, $state, CurrentUser) {
    })
    .controller('CriteriaMinorsCtrl', function($scope, $state, CurrentUser, Minors) {
    });
