(function () {
    angular
        .module('mpisaApp', ['ngResource', 'angularSoundManager'])
        .config(['$compileProvider',
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|ftp|blob):|data:image\/|mailto:/);
            }]);
})();