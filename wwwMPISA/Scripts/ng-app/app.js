(function () {
    angular
        .module('mpisaApp', ['ngResource'])
        .config(['$compileProvider',
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\//);
            }]);
})();