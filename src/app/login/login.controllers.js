angular.module('gg.app')
    .controller('LoginCtrl', function($scope, $state, Auth) {
        $scope.auth = new Auth({});

        $scope.login = function() {
            $scope.auth.login().then(
                function() { $state.go('app.criteria.majors'); }
            );
        }
    });
