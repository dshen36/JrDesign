angular.module('gg.app')
    .controller('RegisterCtrl', function($scope, $state, Register) {
        $scope.register = new Register({});

        $scope.signUp = function() {
            $scope.register.register()
                .success(
                    function() {
                        $state.go('login');
                    }
                )
                .error(
                    function() {
                        $scope.$emit('notification.error');
                    }
                )
        }
    });
