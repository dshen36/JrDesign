angular.module('gg.app')
    .config(function($stateProvider) {
        $stateProvider
            .state('app.viewclassoptions', {
                url: '/viewclassoptions',
                controller: 'ViewClassOptionsCtrl',
                templateUrl: '/app/viewclassoptions/views/viewclassoptions.html',
                resolve: {
                    'Courses': function(Course) {
                        return Course.getAll().then(function(courses) {
                            return _.filter(courses, function(course) {
                                return [102, 103, 104].indexOf(course.id) > -1; // hardcoded for demo
                            }); 
                        });
                    },
                    'Sections': function(Courses, Section) {
                        return Section.getAll().then(
                            function(sections) {
                                for (var i = 0; i < sections.length; i ++) {
                                    var course = _.find(Courses, function(c) { return c.id == sections[i].courseId; })
                                    course.addSection(sections[i]);
                                }

                                return sections;
                            });
                    }
                }
            });
    });
