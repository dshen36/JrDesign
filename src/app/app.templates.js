angular.module('gg.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/app/app.html',
    "<h1>{{hello}}</h1><div>Environment is: {{env}}</div>"
  );

}]);
