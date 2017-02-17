

(function (module) {
    var _controller = [
        '$scope', 'contentApi',
        function ($scope, contentApi) {

            $scope.pageIndex = 0;
            $scope.itemsPerPage = 5;
            $scope.contentItems = [];

            $scope.getContentItemsAsync = null;
            $scope.getAllContentItems = function (path) {
                $scope.getContentItemsAsync = contentApi
                    .getContentItems(path)
                    .then(function (items) {
                        $scope.contentItems = items;
                        $scope.getCurrentPageContentItemsDetails();
                    });
            };

            $scope.getCurrentPageContentItemsDetails = function () {
                for (var i = $scope.pageIndex; i < $scope.itemsPerPage; i++) {
                    if ($scope.contentItems.length > i) {

                        $scope.contentItems[i].getDetailsAsync = contentApi
                            .getPostContentItemDetails($scope.contentItems[i], i)
                            .then(function (postContentItemDetails) {
                                $scope.contentItems[postContentItemDetails.id].postDetails = postContentItemDetails;
                                $scope.getContentItemDetailsData($scope.contentItems[postContentItemDetails.id].postDetails);
                            });
                    }
                }
            }

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
                   
                            contenItemDetailsItem.addEmbeds(content);
                            console.log();
                        });
                }
                if (_.isString(contenItemDetailsItem.linksLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.linksLink)
                        .then(function (content) {
                            //contenItemDetailsItem.links = content;
                            contenItemDetailsItem.addPostLinks(content);
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

            $scope.getAllContentItems();
        }];

    module.controller('mainController', _controller);
})(angular.module('mpisaApp'));