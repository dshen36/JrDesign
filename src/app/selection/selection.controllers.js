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
                            available: true,
                            course: available
                        });
                    });

                $scope.availableCourses.push(available);
            });

        function evaluateSectionAvailability() {
            $scope.availableCourses.forEach(
                function(course) {
                    course.sections.forEach(
                        function(section) {
                            section.available = true;

                            if (course.selected) {
                                section.available = false;
                            } else {
                                $scope.selectedSections.forEach(
                                    function(selected) {
                                        if (section.section.hasTimeConflict(selected.section)) {
                                            section.available = false;
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

            evaluateSectionAvailability();
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

            evaluateSectionAvailability();
        }
    });
