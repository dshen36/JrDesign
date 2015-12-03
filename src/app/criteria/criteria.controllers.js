angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope) {
        $scope.wizardSteps = [
            {
                name: 'Major',
                state: 'app.criteria.major'
            },
            {
                name: 'Tracks',
                state: 'app.criteria.tracks'
            },
            {
                name: 'Minor',
                state: 'app.criteria.minor'
            }
        ];
    })
    .controller('CriteriaMajorCtrl', function($scope, Majors) {
        $scope.majors = [];
        $scope.selectedMajor = null;
        $scope.majorColumns = 3;

        Majors.forEach(
            function(major) {
                $scope.majors.push({
                    major: major,
                    selected: false
                });
            });

        $scope.selectMajor = function(major) {
            major.selected = true;
            
            if ($scope.selectedMajor) {
                $scope.selectedMajor.selected = false;
            }

            $scope.selectedMajor = major.selected ? major : null;
        }

        $scope.majorSections = $scope.getSections($scope.majors, $scope.majorColumns);
    })
    .controller('CriteriaTracksCtrl', function($scope, ActiveMajor) {
        $scope.tracks = [];
        $scope.trackColumns = 3;

        ActiveMajor.tracks.forEach(
            function(track) {
                $scope.tracks.push({
                    track: track,
                    selected: false
                });
            });
        
        $scope.selectTrack = function(track) {
            track.selected = !track.selected;
        }

        $scope.trackSections = $scope.getSections($scope.tracks, $scope.trackColumns);
    })
    .controller('CriteriaMinorCtrl', function($scope, Minors) {
        $scope.minors = [];
        $scope.selectedMinor = null;
        $scope.minorColumns = 3;

        Minors.forEach(
            function(minor) {
                $scope.minors.push({
                    minor: minor,
                    selected: false
                });
            });

        $scope.selectMinor = function(minor) {
            minor.selected = true;
            
            if ($scope.selectedMinor) {
                $scope.selectedMinor.selected = false;
            }

            $scope.selectedMinor = minor.selected ? minor : null;
        }

        $scope.minorSections = $scope.getSections($scope.minors, $scope.minorColumns);
    });
