angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, $state, CurrentUser) {
        $scope.wizardConfig = {
            steps: [
                {
                    name: 'Majors',
                    state: 'app.criteria.majors',
                    transitionFrom: function() {
                        return CurrentUser.saveMajors();
                    }
                },
                {
                    name: 'Tracks',
                    state: 'app.criteria.tracks',
                    transitionFrom: function() {
                        return CurrentUser.saveTracks();
                    }
                },
                {
                    name: 'Minors',
                    state: 'app.criteria.minors',
                    transitionFrom: function() {
                        return CurrentUser.saveMinors();
                    }
                }
            ]
        };

        $scope.currentStep = $scope.wizardConfig.steps[0];

        $scope.transitionToStep = function(stepIndex) {
            $scope.currentStep.transitionFrom().then(
                function() {
                    $scope.currentStep = $scope.wizardConfig.steps[stepIndex];
                    $state.go($scope.wizardConfig.steps[stepIndex].state);
                }
            );
        }

        $scope.transitionToState = function(state) {
            $scope.currentStep.transitionFrom().then(
                function() { $state.go(state); }
            );
        }
    })
    .controller('CriteriaMajorsCtrl', function($scope, $state, CurrentUser, Majors) {
        $scope.majors = Majors;

        $scope.selectMajor = function(major) {
            CurrentUser.addMajor(major);
        }
    })
    .controller('CriteriaTracksCtrl', function($scope, $state, CurrentUser) {
        $scope.majors = CurrentUser.majors;

        $scope.selectTrack = function(track) {
            CurrentUser.addTrack(track);
        }
    })
    .controller('CriteriaMinorsCtrl', function($scope, $state, CurrentUser, Minors) {
        $scope.minors = Minors;

        $scope.selectMinor = function(minor) {
            CurrentUser.addMinor(minor);
        }
    });
