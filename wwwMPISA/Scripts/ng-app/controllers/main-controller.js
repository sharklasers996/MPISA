

(function (module) {
    var _controller = [
        '$scope', 'contentApi',
        function ($scope, contentApi) {

            $scope.pageIndex = 0;
            $scope.itemsPerPage = 5;

            $scope.posts = [];
            $scope.getPostsAsync = null;
            $scope.getAllPosts = function () {
                $scope.getPostsAsync = contentApi
                    .getPosts()
                    .then(function (posts) {
                        $scope.posts = posts;
                        $scope.getCurrentPagePostDetails();
                    });
            };

            $scope.getCurrentPagePostDetails = function () {
                for (var i = $scope.pageIndex; i < $scope.itemsPerPage; i++) {
                    if (i < $scope.posts.length) {

                        $scope.posts[i].getDetailsAsync = contentApi
                            .getPostDetails($scope.posts[i], i)
                            .then(function (postDetails) {
                                $scope.setPostDetails(postDetails);
                            });
                    }
                }
            };
            $scope.setPostDetails = function (postDetails) {
                $scope.posts[postDetails.id].details = postDetails;

                if (_.isString(postDetails.infoLink)) {
                    $scope.posts[postDetails.id].getDetailsAsync = contentApi
                        .getText(postDetails.infoLink)
                        .then(function (response) {
                            $scope.posts[postDetails.id].details.set(response);
                        });
                }

                if (_.isString(postDetails.photoAlbumPath)) {
                    $scope.posts[postDetails.id].getPhotosAsync = contentApi
                        .getContentItems(postDetails.photoAlbumPath)
                        .then(function (photos) {
                            $scope.posts[postDetails.id].details.addPhotos(photos);
                            console.log();
                        });
                }
            };

            $scope.getAllPosts();

            $scope.lyrics = null;
            $scope.getLyrics = function () {
                contentApi
                    .getContentItems('/Lyrics')
                    .then(function (items) {
                        if (items.length === 1) {
                            var lyricsJsonContentItem = items[0];
                            if (lyricsJsonContentItem.path.indexOf('lyrics.json') !== -1) {
                                contentApi
                                    .getText(lyricsJsonContentItem.tempLink)
                                    .then(function (lyricsJson) {
                                        $scope.lyrics = _.map(lyricsJson,
                                            function (lyricsAlbum) {
                                                return new LyricsAlbum(lyricsAlbum);
                                            });
                                    });
                            }
                        }
                    });
            };

            //  $scope.getLyrics();
        }];

    module.controller('mainController', _controller);
})(angular.module('mpisaApp'));