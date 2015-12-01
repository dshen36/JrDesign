'use strict'

angular.module('gg.config', [])
    .factory('Environment', function() {
        return {
            name: 'mock',
            path: 'http://localhost'
        }
    });
