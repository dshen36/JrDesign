angular.module('gg.app')
    .controller('SelectionCtrl', function($scope, Courses, CompletedCourses, AvailableCourses) {
        $scope.courses = Courses;
        $scope.availableCourses = [];
        $scope.selectedSections = [];

        AvailableCourses.forEach(
            function(course) {
                var available = {
                    course: course,
                    sections: []
                };

                course.sections.forEach(
                    function(section) {
                        available.sections.push({
                            section: section,
                            selected: false,
                            available: true
                        });
                    });

                $scope.availableCourses.push(available);
            });

        $scope.selectSection = function(section) {
            $scope.selectedSections.push(section);
            section.selected = true;
            section.available = false;

            /* TODO filter available list */
        }

        $scope.deselectSection = function(section) {
            var sectionIdx = _.findIndex(
                $scope.selectedSections,
                function(selected) {
                    return selected.section.id == section.section.id;
                });

            $scope.selectedSections.splice(sectionIdx, 1);
            section.selected = false;
            section.available = true;
        }
    });
