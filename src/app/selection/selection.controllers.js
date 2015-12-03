angular.module('gg.app')
    .controller('SelectionCtrl', function($scope, CompletedCourses, AvailableCourses) {
        $scope.availableCourses = [];
        $scope.selectedSections = [];

        AvailableCourses.forEach(
            function(course) {
                var available = {
                    course: course,
                    selected: false,
                    sections: []
                };

                course.sections.forEach(
                    function(section) {
                        available.sections.push({
                            section: section,
                            selected: false,
                            course: available,
                            conflicts: {
                                alreadySelected: false,
                                timeConflict: false
                            }
                        });
                    });

                $scope.availableCourses.push(available);
            });

        function flagSectionConflicts() {
            $scope.availableCourses.forEach(
                function(course) {
                    course.sections.forEach(
                        function(section) {
                            section.conflicts.alreadySelected = false;
                            section.conflicts.timeConflict = false;

                            if (course.selected) {
                                section.conflicts.alreadySelected = true;
                            } else {
                                $scope.selectedSections.forEach(
                                    function(selected) {
                                        if (section.section.hasTimeConflict(selected.section)) {
                                            section.conflicts = true;
                                        }
                                    });
                            }
                        });
                    });
        }

        $scope.selectSection = function(section) {
            $scope.selectedSections.push(section);
            section.selected = true;
            section.course.selected = true;

            flagSectionConflicts();
        }

        $scope.deselectSection = function(section) {
            var sectionIdx = _.findIndex(
                $scope.selectedSections,
                function(selected) {
                    return selected.section.id == section.section.id;
                });

            $scope.selectedSections.splice(sectionIdx, 1);
            section.selected = false;
            section.course.selected = false;

            flagSectionConflicts();
        }

        $scope.isAvailable = function(section) {
            for (var key in section.conflicts) {
                if (section.conflicts.hasOwnProperty(key)) {
                    if (section.conflicts[key]) {
                        return false;
                    }
                }
            }

            return true;
        }
    });
