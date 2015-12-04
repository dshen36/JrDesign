angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, Majors, SelectedMajor, SelectedTracks, Minors, SelectedMinor) {
        $scope.majors = Majors;
        $scope.minors = Minors;
        $scope.selectedMajor = SelectedMajor;
        $scope.selectedMinor = SelectedMinor;

        $scope.wizardConfig = {
            steps: {
                major: {
                    previous: null,
                    name: 'Major',
                    state: 'app.criteria.major',
                    completed: function() {
                        return !!$scope.selectedMajor;
                    }
                },
                tracks: {
                    previous: 'major',
                    name: 'Tracks',
                    state: 'app.criteria.tracks',
                    completed: function() {
                        return _.keys(SelectedTracks).length != 0;
                    }
                },
                minor: {
                    previous: 'tracks',
                    name: 'Minor',
                    state: 'app.criteria.minor',
                    completed: function() {
                        return true;
                    }
                }
            }
        };

        $scope.wizardConfig.numSteps = _.keys($scope.wizardConfig.steps).length;

        $scope.wizardCompleted = function() {
            var steps = _.keys($scope.wizardConfig.steps);

            for (var i = 0; i < steps.length; i ++) {
                if (!$scope.wizardConfig.steps[steps[i]].completed()) {
                    return false;
                }
            }

            return true;
        }
        
        $scope.setSelectedMajor = function(major) {
            $scope.selectedMajor = major;
        }

        $scope.setSelectedMinor = function(minor) {
            $scope.selectedMinor = minor;
        }
    })
    .controller('CriteriaMajorCtrl', function($scope, $state, Majors) {
        $scope.majorColumns = 3;
        $scope.majorSections = $scope.getSections($scope.majors, $scope.majorColumns);

        $scope.selectMajor = function(major) {
            if ($scope.selectedMajor && $scope.selectedMajor.id == major.id) {
                $scope.setSelectedMajor(null);
            } else {
                $scope.setSelectedMajor(major);
            }
        }
    })
    .controller('CriteriaTracksCtrl', function($scope, $state, SelectedTracks) {
        if (!$scope.wizardConfig.steps.major.completed()) {
            $state.go('app.criteria.major');
            return;
        }

        $scope.trackColumns = 3;
        $scope.trackSections = $scope.getSections($scope.selectedMajor.tracks, $scope.trackColumns);
        $scope.selectedTracks = SelectedTracks;

        $scope.selectTrack = function(track) {
            if (SelectedTracks[track.id]) {
                delete SelectedTracks[track.id];
            } else {
                SelectedTracks[track.id] = track;
            }
        }
    })
    .controller('CriteriaMinorCtrl', function($scope, $state, Minors) {
        if (!$scope.wizardConfig.steps.tracks.completed()) {
            $state.go('app.criteria.tracks');
            return;
        }

        $scope.minorColumns = 3;
        $scope.minorSections = $scope.getSections($scope.minors, $scope.minorColumns);

        $scope.selectMinor = function(minor) {
            if ($scope.selectedMinor && $scope.selectedMinor.id == minor.id) {
                $scope.setSelectedMinor(null);
            } else {
                $scope.setSelectedMinor(minor);
            }
        }
    });
