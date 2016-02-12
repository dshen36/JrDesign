angular.module('gg.app')
    .controller('LoginCtrl', function($scope, $state, Auth) {
        $scope.auth = new Auth({});

        $scope.login = function() {
            $scope.auth.login()
                .success(
                    function() {
                        $scope.$emit('notification.success', 'Login success');
                        $state.go('app.criteria.majors');
                    }
                )
                .error(
                    function() {
                        $scope.$emit('notification.error', 'The email and password do not match');
                    }
                );
        }
    });
