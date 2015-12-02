angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, Majors, Minors) {
        $scope.majors = [];
        $scope.minors = [];
        $scope.selectedMajor = null;
        $scope.selectedMinor = null;
        $scope.selectedTracks = {};

        Majors.forEach(
            function(major) {
                $scope.majors.push({
                    major: major,
                    selected: false,
                    tracks: []
                });

                major.tracks.forEach(
                    function(track) {
                        $scope.majors[$scope.majors.length - 1].tracks.push({
                            track: track,
                            selected: false
                        });
                    });
            });

        Minors.forEach(
            function(minor) {
                $scope.minors.push({
                    minor: minor,
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

        $scope.selectMinor = function(minor) {
            minor.selected = true;
            
            if ($scope.selectedMinor) {
                $scope.selectedMinor.selected = false;
            }

            $scope.selectedMinor = minor.selected ? minor : null;
        }

        $scope.selectTrack = function(track) {
            track.selected = true;
            $scope.selectedTracks[track.id] = track;
        }

        $scope.deselectTrack = function(track) {
            track.selected = false;
            delete $scope.selectedTracks[track.id];
        }
    });
