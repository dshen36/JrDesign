angular.module('gg.app')
    .controller('SelectionCtrl', function($scope, AvailableCourses) {
        $scope.availableCourses = AvailableCourses;
        $scope.availableColumns = 2;
        $scope.availableSections = $scope.getSections(AvailableCourses, $scope.availableColumns);
        $scope.selectedCourse = null;
        $scope.sectionColumns = 3;
        $scope.sectionSections = [];
        $scope.selectedSections = {};
        $scope.conflicts = {};

        $scope.selectCourse = function(course) {
            if ($scope.selectedCourse && $scope.selectedCourse.id == course.id) {
                $scope.selectedCourse = null;
                $scope.sectionSections = [];
            } else {
                $scope.selectedCourse = course;
                $scope.sectionSections = $scope.getSections(course.sections, $scope.sectionColumns);
            }
        }

        $scope.selectSection = function(section) {
            if ($scope.conflicts[section.id]) {
                return;
            }

            if ($scope.selectedSections[section.id]) {
                delete $scope.selectedSections[section.id];
            } else {
                $scope.selectedSections[section.id] = section;
            }

            flagConflicts();
        }

        $scope.getAverageGpa = function() {
            var sections = _.values($scope.selectedSections);
            var sum = 0;
            
            if (sections.length == 0) {
                return 0;
            }

            for (var i = 0; i < sections.length; i ++) {
                sum += sections[i].professor.avgGpa;
            }

            return sum / sections.length;
        }

        $scope.getTotalCreditHours = function() {
            var sections = _.values($scope.selectedSections);
            var sum = 0;
            
            if (sections.length == 0) {
                return 0;
            }

            for (var i = 0; i < sections.length; i ++) {
                sum += sections[i].$$course.credits;
            }

            return sum;
        }

        function flagConflicts() {
            var selected = _.values($scope.selectedSections);
            var conflictIds = _.keys($scope.conflicts);

            for (var i = 0; i < conflictIds.length; i ++) {
                delete $scope.conflicts[conflictIds[i]];
            }

            for (var i = 0; i < selected.length; i ++) {
                for (var j = 0; j < selected[i].$$course.sections.length; j ++) {
                    if (selected[i].id != selected[i].$$course.sections[j].id) {
                        if (!$scope.conflicts[selected[i].$$course.sections[j].id]) {
                            $scope.conflicts[selected[i].$$course.sections[j].id] = { courseSelected: false, timeConflict: false };
                        }

                        $scope.conflicts[selected[i].$$course.sections[j].id].courseSelected = true;
                    }
                }
            }

            for (var i = 0; i < selected.length; i ++) {
                for (var j = 0; j < $scope.availableCourses.length; j ++) {
                    for (var k = 0; k < $scope.availableCourses[j].sections.length; k ++) {
                        if (selected[i].id != $scope.availableCourses[j].sections[k].id &&
                            selected[i].hasTimeConflict($scope.availableCourses[j].sections[k])) {
                            if (!$scope.conflicts[$scope.availableCourses[j].sections[k].id]) {
                                $scope.conflicts[$scope.availableCourses[j].sections[k].id] = { courseSelected: false, timeConflict: false };
                            }

                            $scope.conflicts[$scope.availableCourses[j].sections[k].id].timeConflict = true;
                        }
                    }
                }
            }
        }
    });
