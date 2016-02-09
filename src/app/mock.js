angular.module('gg.mock', ['gg.app', 'ngMockE2E'])
    .run(function($httpBackend) {
        var currentId = 0;
        var currentUser = {};
        var majors = [];
        var minors = [];
        var courses = [];

        function generateId() {
            return currentId++
        }

        function generateCurrentUser() {
            return {
                id: generateId,
                majors: [],
                minors: [],
                tracks: [],
            };
        }

        function generateMajors(numMajors, numTracks) {
            var majors = [];

            for (var i = 0; i < numMajors; i ++) {
                majors.push({
                    id: generateId(),
                    name: 'Major ' + i,
                    description: 'This is major ' + i,
                    tracks: generateTracks(numTracks)
                });
            }

            return majors;
        }

        function generateTracks(numTracks) {
            var tracks = [];

            for (var i = 0; i < numTracks; i ++) {
                tracks.push({
                    id: generateId(),
                    name: 'Track ' + i,
                    description: 'This is track ' + i
                });
            }

            return tracks;
        }

        function generateMinors(numMinors) {
            var minors = [];

            for (var i = 0; i < numMinors; i ++) {
                minors.push({
                    id: generateId(),
                    name: 'Minor ' + i,
                    description: 'This is minor ' + i
                });
            }

            return minors;
        }

        function generateCourses(numCourses) {
            var courses = [];

            for (var i = 0; i < numCourses; i ++) {
                courses.push({
                    id: generateId(),
                    name: 'Course ' + i,
                    isCompleted: false
                });
            }

            return courses;
        }

        $httpBackend.whenGET(/^\/views\//).passThrough();
        $httpBackend.whenGET(/^\/assets\//).passThrough();
        $httpBackend.whenGET(/^\/templates\//).passThrough();
        $httpBackend.whenGET(/\.html/).passThrough();

        $httpBackend.whenGET(/^\/users\/me$/).respond(
            function(method, url, data, headers) {
                return [200, currentUser, {}];
            }
        );

        $httpBackend.whenGET(/^\/majors$/).respond(
            function(method, url, data, headers, params) {
                return [200, majors, {}];
            }
        );

        $httpBackend.whenGET(/^\/minors$/).respond(
            function(method, url, data, headers, params) {
                return [200, minors, {}];
            }
        );

        $httpBackend.whenGET(/^\/courses$/).respond(
            function(method, url, data, headers, params) {
                return [200, courses, {}];
            }
        );

        $httpBackend.whenPOST(/^\/users\/me\/majors$/).respond(
            function(method, url, data, headers, params) {
                return [200, {}, {}];
            }
        );

        $httpBackend.whenPOST(/^\/users\/me\/tracks$/).respond(
            function(method, url, data, headers, params) {
                return [200, {}, {}];
            }
        );

        $httpBackend.whenPOST(/^\/users\/me\/minors$/).respond(
            function(method, url, data, headers, params) {
                return [200, {}, {}];
            }
        );

        majors = generateMajors(5, 2);
        minors = generateMinors(6);
        courses = generateCourses(10);
        currentUser = generateCurrentUser();
    });

angular.bootstrap(document, ['gg.mock']);
