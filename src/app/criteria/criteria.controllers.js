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
    .controller('CriteriaMajorCtrl', function(Majors) {
        $scope.majors = [];
        $scope.selectedMajor = null;

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
    })
    .controller('CriteriaTrackCtrl', function(ActiveMajor) {
    })
    .controller('CriteriaMinorCtrl', function(Minors) {
        $scope.minors = [];
        $scope.selectedMinor = null;

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
    });
