angular.module('gg.services')
    .factory('Course', function($http, Section, Prereq) {
        var courseMap = {};

        function Course(data) {
            this.id = data.id;
            this.name = data.name;
            this.subject = data.subject;
            this.courseNum = data.courseNum;
            this.credits = data.credits;
            this.prereqs = data.prereqs ? new Prereq(data.prereqs) : null;
            this.sections = [];

            for (var i = 0; i < data.sections.length; i ++) {
                this.sections.push(new Section(data.sections[i], this));
            }
        }

        Course.getAll = function(user) {
            return $http.get('/assets/data/courses.json').then(
                function(response) {
                    var courses = {};

                    response.data.forEach(
                        function(data) {
                            courses[data.id] = new Course(data);
                        });

                    courseMap = courses;
                    return courses;
                });
        }

        Course.getAvailableCourses = function(completedCourses) {
            var available = [];
            var availableMap = {};

            for (var courseId in courseMap) {
                if (courseMap.hasOwnProperty(courseId)) {
                    var currentAvailable = courseMap[courseId].getAvailableCourses(completedCourses); 

                    currentAvailable.forEach(
                        function(course) {
                            availableMap[course.id] = course;
                        });
                }
            }

            for (var courseId in availableMap) {
                if (availableMap.hasOwnProperty(courseId)) {
                    available.push(availableMap[courseId]);
                }
            }

            return available;
        }

        Course.prototype.getAvailableCourses = function(completedCourses) {
            var available = [];

            for (var courseId in courseMap) {
                if (courseMap.hasOwnProperty(courseId)) {
                    if (!completedCourses[courseId] && courseMap[courseId].prereqsSatisfied(completedCourses)) {
                        available.push(courseMap[courseId]);
                    }
                }
            }

            return available;
        }

        Course.prototype.getFlattenedPrereqs = function() {
            var current = this.prereqs;
            var flattened = [];

            while (current != null) {
                flattened.push(current);
                current = current.childPrereq;
            }

            return flattened;
        }

        Course.prototype.prereqsSatisfied = function(completedCourses) {
            if (!this.prereqs) {
                return true;
            }

            if (!this.prereqs.op) {
                return !!completedCourses[this.prereqs.courseIdLeft];
            }

            var prereqStack = this.getFlattenedPrereqs();

            /* process leaf level prereq */
            var satisfied;
            var current = prereqStack.pop();

            if (current.op == 'and') {
                current.satisfied = completedCourses[current.courseIdLeft] && completedCourses[current.courseIdRight];
            } else if (current.op == 'or') {
                current.satisfied = completedCourses[current.courseIdLeft] || completedCourses[current.courseIdRight];
            } else {
                throw new Error('unregognized op detected: ' + current.op);
            }

            /* keep popping from stack to evaluate entire prereq tree */
            while (prereqStack.length > 0) {
                current = prereqStack.pop();

                if (current.op == 'and') {
                    current.satisfied = completedCourses[current.courseIdLeft] && current.childPrereq.satisfied; 
                } else if (current.op == 'or') {
                    current.satisfied = completedCourses[current.courseIdLeft] || current.childPrereq.satisfied; 
                } else {
                    throw new Error('unregognized op detected: ' + current.op);
                }
            }

            return current.satisfied;
        }

        return Course;
    });
