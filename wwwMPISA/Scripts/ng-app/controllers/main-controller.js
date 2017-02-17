

(function (module) {
    var _controller = [
        '$scope', 'contentApi',
        function ($scope, contentApi) {

            $scope.pageIndex = 0;
            $scope.itemsPerPage = 5;
            $scope.contentItems = [];

            $scope.tempContentItem = null;

            $scope.getContentItemsAsync = null;
            $scope.getContentItems = function (path) {
                $scope.getContentItemsAsync = contentApi
                    .getContentItems(path)
                    .then(function (items) {
                        $scope.contentItems = items;

                        for (var i = 0; i < $scope.itemsPerPage; i++) {
                            if ($scope.contentItems.length > i) {

                                contentApi
                                    .getPostContentItemDetails($scope.contentItems[i], i)
                                    .then(function (postContentItemDetails) {
                                        $scope.contentItems[postContentItemDetails.id].postDetails = postContentItemDetails;
                                        $scope.getContentItemDetailsData($scope.contentItems[postContentItemDetails.id].postDetails);
                                    });
                            }
                        }
                    });
            };

            $scope.getContentItemDetailsData = function (contenItemDetailsItem) {
                if (_.isString(contenItemDetailsItem.titleLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.titleLink)
                        .then(function (content) {
                            contenItemDetailsItem.title = content;
                        });
                }
                if (_.isString(contenItemDetailsItem.embedsLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.embedsLink)
                        .then(function (content) {
                            contenItemDetailsItem.embeds = content;
                        });
                }
                if (_.isString(contenItemDetailsItem.linksLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.linksLink)
                        .then(function (content) {
                            contenItemDetailsItem.links = content;
                        });
                }
                if (_.isString(contenItemDetailsItem.textLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.textLink)
                        .then(function (content) {
                            contenItemDetailsItem.text = content;
                        });
                }
            };

            $scope.getContentItems();
        }];

    module.controller('mainController', _controller);
})(angular.module('mpisaApp'));