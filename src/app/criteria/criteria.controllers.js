angular.module('gg.app')
    .controller('CriteriaCtrl', function($scope, Majors, Minors) {
        var selectedMajor, selectedMinor;

        $scope.majors = [];
        $scope.minors = [];

        Majors.forEach(function(major) { $scope.majors.push({ major: major, selected: false }); });
        Minors.forEach(function(minor) { $scope.minors.push({ minor: minor, selected: false }); });

        $scope.selectMajor = function(major) {
            major.selected = true;
            
            if (selectedMajor) {
                selectedMajor.selected = false;
            }

            selectedMajor = major.selected ? major : null;
        }

        $scope.selectMinor = function(minor) {
            minor.selected = true;
            
            if (selectedMinor) {
                selectedMinor.selected = false;
            }

            selectedMinor = minor.selected ? minor : null;
        }
    });
