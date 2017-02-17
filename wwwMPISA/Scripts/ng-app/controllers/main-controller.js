

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

                        if ($scope.contentItems[i].isPost) {
                            $scope.contentItems[i].getDetailsAsync = contentApi
                                .getPostContentItemDetails($scope.contentItems[i], i)
                                .then(function (postContentItemDetails) {
                                    $scope.contentItems[postContentItemDetails.id].postDetails = postContentItemDetails;
                                    $scope.getPostContentItemDetailsData($scope.contentItems[postContentItemDetails.id].postDetails);
                                });
                        } else if ($scope.contentItems[i].isPhotoAlbum) {
                            $scope.contentItems[i].getDetailsAsync = contentApi
                                .getPhotoContentItemDetails($scope.contentItems[i], i)
                                .then(function (photoContentItemDetails) {
                                    $scope.contentItems[photoContentItemDetails.id].photoAlbumDetails = photoContentItemDetails;
                                    $scope.getPhotoContentItemDetailsData($scope.contentItems[photoContentItemDetails.id].photoAlbumDetails);
                                });
                        }
                    }
                }
            }

            $scope.getPostContentItemDetailsData = function (contenItemDetailsItem) {
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
                        });
                }
                if (_.isString(contenItemDetailsItem.linksLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.linksLink)
                        .then(function (content) {
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

            $scope.getPhotoContentItemDetailsData = function (contenItemDetailsItem) {
                if (_.isString(contenItemDetailsItem.titleLink)) {
                    contentApi
                        .getText(contenItemDetailsItem.titleLink)
                        .then(function (content) {
                            contenItemDetailsItem.title = content;
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

            $scope.getPhotos = function (contentItem) {
                contentItem.getDetailsAsync = contentApi
                    .getContentItems(contentItem.photoAlbumDetails.photoAlbumPath)
                    .then(function (response) {
                        contentItem.photoAlbumDetails.addPhotos(response);
                    });
            }

            $scope.getAllContentItems();
        }];

    module.controller('mainController', _controller);
})(angular.module('mpisaApp'));