angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, $state, CurrentUser) {
        $scope.wizardConfig = {
            steps: [
                {
                    name: 'Majors',
                    state: 'app.criteria.majors',
                    transitionFrom: function() {
                        return CurrentUser.saveMajors();
                    },
                    isComplete: function() {
                        return CurrentUser.majors.length > 0;
                    }
                },
                {
                    name: 'Tracks',
                    state: 'app.criteria.tracks',
                    transitionFrom: function() {
                        return CurrentUser.saveTracks();
                    },
                    isComplete: function() {
                        return CurrentUser.tracks.length > 0;
                    }
                },
                {
                    name: 'Minors',
                    state: 'app.criteria.minors',
                    transitionFrom: function() {
                        return CurrentUser.saveMinors();
                    },
                    isComplete: function() {
                        return CurrentUser.minors.length > 0;
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

        $scope.isStepAvailable = function(stepIndex) {
            for (var i = 0; i < stepIndex; i ++) {
                if (!$scope.wizardConfig.steps[i].isComplete()) {
                    return false;
                }
            }

            return true;
        }

        $scope.isWizardComplete = function() {
            return $scope.isStepAvailable($scope.wizardConfig.steps.length);
        }
    })
    .controller('CriteriaMajorsCtrl', function($scope, $state, CurrentUser, Majors) {
        $scope.majors = Majors;

        $scope.selectMajor = function(major) {
            if (CurrentUser.findMajorById(major.id)) {
                CurrentUser.removeMajorById(major.id);
            } else {
                CurrentUser.addMajor(major);
            }
        }

        $scope.isSelected = function(major) {
            return !!CurrentUser.findMajorById(major.id);
        }
    })
    .controller('CriteriaTracksCtrl', function($scope, $state, CurrentUser) {
        $scope.majors = CurrentUser.majors;

        $scope.selectTrack = function(track) {
            if (CurrentUser.findTrackById(track.id)) {
                CurrentUser.removeTrackById(track.id);
            } else {
                CurrentUser.addTrack(track);
            }
        }

        $scope.isSelected = function(track) {
            return !!CurrentUser.findTrackById(track.id);
        }
    })
    .controller('CriteriaMinorsCtrl', function($scope, $state, CurrentUser, Minors) {
        $scope.minors = Minors;

        $scope.selectMinor = function(minor) {
            if (CurrentUser.findMinorById(minor.id)) { 
                CurrentUser.removeMinorById(minor.id);
            } else {
                CurrentUser.addMinor(minor);
            }
        }

        $scope.isSelected = function(minor) {
            return !!CurrentUser.findMinorById(minor.id);
        }
    });
