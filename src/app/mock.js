angular.module('gg.mock', ['gg.app', 'ngMockE2E'])
    .run(function($httpBackend) {
        var currentUser = {};
        var majors = {};
        var tracks = {};
        var minors = {};

        function getObjectValues(obj) {
            var keys = Object.keys(obj);
            var values = [];

            for (var i = 0; i < keys.length; i ++) {
                values.push(obj[keys[i]]);
            }

            return values;
        }

        function generateCurrentUser() {
            currentUser.id = 1;
            currentUser.majors = getObjectValues(majors).slice(0, 2);
            currentUser.minors = getObjectValues(minors).slice(0, 2);
            currentUser.tracks = getObjectValues(tracks).slice(0, 2);
        }

        function generateMajors(numMajors) {
            for (var i = 0; i < numMajors; i ++) {
                majors[i] = {
                    id: i,
                    name: 'Major ' + i,
                    description: 'This is major ' + i
                }
            }
        }

        function generateTracks(numTracks) {
            for (var i = 0; i < numTracks; i ++) {
                tracks[i] = {
                    id: i,
                    name: 'Track ' + i,
                    description: 'This is track ' + i
                }
            }
        }

        function generateMinors(numMinors) {
            for (var i = 0; i < numMinors; i ++) {
                minors[i] = {
                    id: i,
                    name: 'Minor ' + i,
                    description: 'This is minor ' + i
                }
            }
        }

        $httpBackend.whenGET(/^views\//).passThrough();
        $httpBackend.whenGET(/^assets\//).passThrough();
        $httpBackend.whenGET(/^templates\//).passThrough();
        $httpBackend.whenGET(/\.html/).passThrough();

        $httpBackend.whenGET(/^users\/me$/).respond(
            function(method, url, data, headers) {
            }
        );

        $httpBackend.whenGET(/^majors$/).respond(
            function(method, url, data, headers, params) {
                var majors = getObjectValues(majors);
                return [200, majors, {}];
            }
        );

        $httpBackend.whenGET(/^majors/[0-9]+/tracks$/).respond(
            function(method, url, data, headers, params) {
                var tracks = getObjectValues(tracks);
                return [200, tracks, {}];
            }
        );

        $httpBackend.whenGET(/^minors$/).respond(
            function(method, url, data, headers, params) {
                var minors = getObjectValues(minors);
                return [200, minors, {}];
            }
        );

        generateMajors(5);
        generateTracks(8);
        generateMinors(6);
        generateCurrentUser();
    });

angular.bootstrap(document, ['gg.mock']);
