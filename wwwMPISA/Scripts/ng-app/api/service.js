(function (module) {
    var _service = [
        '$http', '$q', '$location',
        function ($http, $q, $location) {

            function _getContentItems(path) {
                if (path === ''
                    || path === undefined) {
                    path = '/Content';
                }

                var request = ({
                    method: "get",
                    url: window.location.href + "content.php?path=" + path
                });

                return new AsyncResultApiCall($q, $http,
                    request,
                    function (response) {
                        return _.map(response,
                            function (item) {
                                return new ContentItem(item);
                            });
                    }).call();
            };

            function _getPostContentItemDetails(contentItem, id) {
                var request = ({
                    method: "get",
                    url: window.location.href + "content.php?path=" + contentItem.path
                });

                return new AsyncResultApiCall($q, $http,
                    request,
                    function (response) {
                        var contentItemsArray = _.map(response,
                            function (item) {
                                return new ContentItem(item);
                            });
                        return new PostContentItemDetails(contentItemsArray, id);
                    }).call();
            };

            function _getPhotoContentItemDetails(contentItem, id) {
                var request = ({
                    method: "get",
                    url: window.location.href + "content.php?path=" + contentItem.path
                });

                return new AsyncResultApiCall($q, $http,
                    request,
                    function (response) {
                        var contentItemsArray = _.map(response,
                            function (item) {
                                return new ContentItem(item);
                            });
                        return new PhotoContentItemDetails(contentItemsArray, id);
                    }).call();
            };

            function _getText(textFileUrl) {
                var request = ({
                    method: "get",
                    url: textFileUrl
                });

                return new AsyncResultApiCall($q, $http,
                    request,
                    function (response) {
                        return response;
                    }).call();
            };

            function _getLyricsAlbums() {
                var request = ({
                    method: "get",
                    url: window.location.href + "content.php?path=/Lyrics"
                });

                return new AsyncResultApiCall($q, $http,
                    request,
                    function (response) {
                        return _.map(response,
                            function (item) {
                                return new LyricsAlbum(item);
                            });

                    }).call();
            };

            function _getLyricsAlbumFiles(lyricsAlbum) {
                var request = ({
                    method: "get",
                    url: lyricsAlbum.path
                });

                return new AsyncResultApiCall($q, $http,
                    request,
                    function (response) {
                        return _.map(response,
                            function (item) {
                                return new Lyrics(item);
                            });
                    }).call();
            }

            return {
                getContentItems: _getContentItems,
                getText: _getText,
                getPostContentItemDetails: _getPostContentItemDetails,
                getPhotoContentItemDetails: _getPhotoContentItemDetails,
                getLyricsAlbums: _getLyricsAlbums,
                getLyricsAlbumFiles: _getLyricsAlbumFiles
            }
        }];


    module.factory('contentApi', _service);
})(angular.module('mpisaApp'));