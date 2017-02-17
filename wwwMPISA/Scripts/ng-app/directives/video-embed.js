(function (module) {

    var _directive = [
        '$sce', function ($sce) {
            return {
                scope: {
                    src: '='
                },
                restrict: 'E',
                template: '<iframe src="{{ trustedUrl }}" frameborder="0" allowfullscreen></iframe>',
                link: function (scope) {
                    scope.trustedUrl = $sce.trustAsResourceUrl(scope.src);
                }
            }
        }];

    module.directive('videoEmbed', _directive);
})(angular.module('mpisaApp'));