angular.module('gg.mock', ['gg.app', 'ngMockE2E'])
    .run(function($httpBackend) {
        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/assets\//).passThrough();
        $httpBackend.whenGET(/templates\//).passThrough();
        $httpBackend.whenGET(/\.html/).passThrough();
    });

angular.bootstrap(document, ['gg.mock']);
