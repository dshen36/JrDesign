angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, $state, CurrentUser) {
        $scope.wizardConfig = {
            steps: [
                {
                    order: 0,
                    name: 'Majors',
                    state: 'app.criteria.majors',
                    transitionFrom: function() {
                        return CurrentUser.saveMajors();
                    },
                    isComplete: function() {
                        return CurrentUser.majors.length > 0;
                    },
                    incompleteMessage: 'You must select at least one major'
                },
                {
                    order: 1,
                    name: 'Tracks',
                    state: 'app.criteria.tracks',
                    transitionFrom: function() {
                        return CurrentUser.saveTracks();
                    },
                    isComplete: function() {
                        return CurrentUser.tracks.length > 0;
                    },
                    incompleteMessage: 'You must select at least one track'
                },
                {
                    order: 2,
                    name: 'Minors',
                    state: 'app.criteria.minors',
                    transitionFrom: function() {
                        return CurrentUser.saveMinors();
                    },
                    isComplete: function() {
                        return CurrentUser.minors.length > 0;
                    },
                    incompleteMessage: 'You must select at least one minor'
                }
            ]
        };

        $scope.currentStep = $scope.wizardConfig.steps[0];

        $scope.stepIsAvailable = function(step) {
            for (var i = 0; i < step.order; i ++) {
                if (!$scope.wizardConfig.steps[i].isComplete()) {
                    return false;
                }
            }

            return true;
        }

        $scope.goToStep = function(step) {
            if (!$scope.stepIsAvailable(step)) {
                broadcastIncomplete();
                return;
            }

            $scope.currentStep.transitionFrom().then(
                function() {
                    $scope.currentStep = step;
                    $state.go(step.state);
                }
            );
        }

        $scope.nextStep = function() {
            var next = $scope.wizardConfig.steps[$scope.currentStep.order + 1];

            if (!$scope.stepIsAvailable(next)) {
                broadcastIncomplete();
                return;
            }

            $scope.currentStep.transitionFrom().then(
                function() {
                    $scope.currentStep = next;
                    $state.go(next.state);
                }
            );
        }

        $scope.allStepsComplete = function() {
            for (var i = 0; i < $scope.wizardConfig.steps.length; i ++) {
                if (!$scope.wizardConfig.steps[i].isComplete()) {
                    return false;
                }
            }

            return true;
        }

        $scope.finish = function() {
            if (!$scope.allStepsComplete()) {
                broadcastIncomplete();
                return;
            }

            $scope.currentStep.transitionFrom().then(
                function() {
                    $state.go('app.completed');
                }
            );
        }

        function broadcastIncomplete() {
            for (var i = 0; i < $scope.wizardConfig.steps.length; i ++) {
                var step = $scope.wizardConfig.steps[i];

                if (!step.isComplete() && $scope.stepIsAvailable(step)) {
                    $scope.$broadcast('notification.error', step.incompleteMessage);
                }
            }
        }

        $state.go($scope.currentStep.state);
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
