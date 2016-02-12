angular.module('gg.app')
    .controller('RegisterCtrl', function($scope, $state, Register) {
        $scope.register = new Register({});

        $scope.signUp = function() {
            $scope.register.register().then(
                function() {
                    $state.go('login');
                }
            );
        }
    });
