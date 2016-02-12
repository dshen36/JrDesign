'use strict'

angular.module('gg.config', [])
    .factory('Environment', function() {
        return {
            name: 'prod',
            path: 'localhost:3000'
        }
    });
