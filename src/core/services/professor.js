angular.module('gg.services')
    .factory('Professor', function() {
        function Professor(data) {
            this.id = data.id;
            this.name = data.name;
            this.avgGpa = data.avgGpa;
        }

        return Professor;
    });
