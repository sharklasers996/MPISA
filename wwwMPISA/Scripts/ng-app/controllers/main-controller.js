(function (module) {
    var _controller = [
        '$scope', 'contentApi', 'angularPlayer', '$filter',
        function ($scope, contentApi, angularPlayer, $filter) {


            $scope.initSoundManager = function () {
                angularPlayer.init();
                $scope.$on('track:progress', function (event, data) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function () {
                            $scope.progress = data;
                        });
                    }
                });
                $scope.$on('track:id', function (event, data) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function () {
                            $scope.currentPlaying = angularPlayer.currentTrackData();
                        });
                    }
                });
                $scope.$on('currentTrack:position', function (event, data) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function () {
                            $scope.currentPostion = $filter('humanTime')(data);
                        });
                    }
                });
                $scope.$on('currentTrack:duration', function (event, data) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function () {
                            $scope.currentDuration = $filter('humanTime')(data);
                        });
                    }
                });
                $scope.isPlaying = false;
                $scope.$on('music:isPlaying', function (event, data) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function () {
                            $scope.isPlaying = data;
                        });
                    }
                });
                $scope.playlist = angularPlayer.getPlaylist(); //on load
                $scope.$on('player:playlist', function (event, data) {
                    if (!$scope.$$phase) {
                        $scope.$apply(function () {
                            $scope.playlist = data;
                        });
                    }
                });
            };




            $scope.contact = 'plentovaldovas' + '@' + 'gmail.com';
            $scope.menu = {
                0: "Posts",
                1: "Photos",
                2: "Bio",
                3: "Music",
                4: "Contacts"
            };
            $scope.menuIndex = 0;
            $scope.setMenuIndex = function (index) {
                if (index === 0) {
                    $scope.setCurrentPostItemsAsPosts();
                }

                if (index === 1) {
                    $scope.setCurrentPostItemsAsPhotos();
                }

                if (index === 3) {
                    $scope.initPlayer();
                }

                $scope.menuIndex = index;
            };
            $scope.getMenuItemClass = function (index) {
                if (index === $scope.menuIndex) {
                    return 'active';
                }
                return '';
            };

            $scope.getContentClass = function (index) {
                if (index === $scope.menuIndex) {
                    return 'active';
                }
                return 'inactive';
            }

            $scope.currentPostItems = [];
            $scope.itemsPerPage = 5;

            $scope.postPageIndex = 0;
            $scope.photoPageIndex = 0;

            $scope.posts2 = [];
            $scope.photos = [];
            $scope.getPostsAndPhotosAsync = null;

            $scope.getAllPostsAndPhotos = function () {
                $scope.getPostsAndPhotosAsync = contentApi
                    .getPosts()
                    .then(function (posts) {
                        $scope.posts2 = posts.filter(
                            function (post) {
                                return post.path.indexOf("photo_") === -1;
                            });

                        $scope.photos = posts.filter(
                            function (post) {
                                return post.path.indexOf("post_") === -1;
                            });

                        $scope.setCurrentPostItemsAsPosts();
                    });
            };

            $scope.setCurrentPostItemsAsPosts = function () {
                $scope.currentPostItems = [];

                var maxValue = $scope.postPageIndex + $scope.itemsPerPage;
                for (var i = $scope.postPageIndex; i < maxValue; i++) {
                    if (i < $scope.posts2.length) {
                        $scope.currentPostItems.push($scope.posts2[i]);

                        if ($scope.posts2[i].details !== null) {
                            continue;
                        }

                        $scope.posts2[i].getDetailsAsync = contentApi
                            .getPostDetails($scope.posts2[i], i)
                            .then(function (postDetails) {
                                $scope.setPostDetails2(postDetails);
                            });
                    }
                }
            };

            $scope.setCurrentPostItemsAsPhotos = function () {
                $scope.currentPostItems = [];
                var maxValue = $scope.photoPageIndex + $scope.itemsPerPage;
                for (var i = $scope.photoPageIndex; i < maxValue; i++) {
                    if (i < $scope.photos.length) {
                        $scope.currentPostItems.push($scope.photos[i]);

                        if ($scope.photos[i].details !== null) {
                            continue;
                        }

                        $scope.photos[i].getDetailsAsync = contentApi
                            .getPostDetails($scope.photos[i], i)
                            .then(function (postDetails) {
                                $scope.setPhotoDetails(postDetails);
                            });
                    }
                }
            };


            $scope.setPostDetails2 = function (postDetails) {
                $scope.posts2[postDetails.id].details = postDetails;
                $scope.posts2[postDetails.id].details.setContentApi(contentApi);

                if (_.isString(postDetails.infoLink)) {
                    $scope.posts2[postDetails.id].getDetailsAsync = contentApi
                        .getText(postDetails.infoLink)
                        .then(function (response) {
                            $scope.posts2[postDetails.id].details.set(response);
                        });
                }
            };

            $scope.setPhotoDetails = function (photoDetails) {
                $scope.photos[photoDetails.id].details = photoDetails;
                $scope.photos[photoDetails.id].details.setContentApi(contentApi);

                if (_.isString(photoDetails.infoLink)) {
                    $scope.photos[photoDetails.id].getDetailsAsync = contentApi
                        .getText(photoDetails.infoLink)
                        .then(function (response) {
                            $scope.photos[photoDetails.id].details.set(response);
                        });
                }

                if (_.isString(photoDetails.photoAlbumPath)) {
                    $scope.photos[photoDetails.id].getPhotosAsync = contentApi
                        .getContentItems(photoDetails.photoAlbumPath)
                        .then(function (photos) {
                            $scope.photos[photoDetails.id].details.addPhotos(photos);
                        });
                }
            };

            $scope.getAllPostsAndPhotos();

            $scope.incrementPageIndex = function () {
                if ($scope.menuIndex === 0) {
                    $scope.postPageIndex = $scope.postPageIndex + $scope.itemsPerPage;

                    if ($scope.postPageIndex > $scope.posts2.length) {
                        $scope.decrementPageIndex();
                    }

                    $scope.setCurrentPostItemsAsPosts();
                }

                if ($scope.menuIndex === 1) {
                    $scope.photoPageIndex = $scope.photoPageIndex + $scope.itemsPerPage;

                    if ($scope.photoPageIndex > $scope.photos.length) {
                        $scope.decrementPageIndex();
                    }

                    $scope.setCurrentPostItemsAsPhotos();
                }
            };

            $scope.decrementPageIndex = function () {
                if ($scope.menuIndex === 0) {
                    $scope.postPageIndex = $scope.postPageIndex - $scope.itemsPerPage;

                    if ($scope.postPageIndex < 0) {
                        $scope.postPageIndex = 0;
                    }

                    $scope.setCurrentPostItemsAsPosts();
                }

                if ($scope.menuIndex === 1) {
                    $scope.photoPageIndex = $scope.photoPageIndex - $scope.itemsPerPage;

                    if ($scope.photoPageIndex < 0) {
                        $scope.photoPageIndex = 0;
                    }

                    $scope.setCurrentPostItemsAsPhotos();
                }
            };

            $scope.previousPageAvailable = function () {
                if ($scope.menuIndex === 0) {
                    var previousPageIndex = $scope.postPageIndex - $scope.itemsPerPage;
                    if (previousPageIndex < 0) {
                        return false;
                    }
                    return true;
                }

                if ($scope.menuIndex === 1) {
                    var previousPageIndex = $scope.photoPageIndex - $scope.itemsPerPage;
                    if (previousPageIndex < 0) {
                        return false;
                    }
                    return true;
                }
            };

            $scope.nextPageAvailable = function () {
                if ($scope.menuIndex === 0) {
                    var nextPageIndex = $scope.postPageIndex + $scope.itemsPerPage;
                    if (nextPageIndex > $scope.posts2.length) {
                        return false;
                    }
                    return true;
                }

                if ($scope.menuIndex === 1) {
                    var nextPageIndex = $scope.photoPageIndex + $scope.itemsPerPage;
                    if (nextPageIndex > $scope.photos.length) {
                        return false;
                    }
                    return true;
                }
            };

            $scope.getPreviousPageClass = function () {
                if ($scope.previousPageAvailable()) {
                    return 'post-pagination-button';
                }
                return 'post-pagination-button-disabled';
            };

            $scope.getNextPageClass = function () {
                if ($scope.nextPageAvailable()) {
                    return 'post-pagination-button';
                }
                return 'post-pagination-button-disabled';
            };

            //$scope.pageIndex = 0;

            //$scope.posts = [];
            //$scope.getPostsAsync = null;
            //$scope.getAllPosts = function () {
            //    $scope.getPostsAsync = contentApi
            //        .getPosts()
            //        .then(function (posts) {
            //            $scope.posts = posts;
            //            $scope.getCurrentPagePostDetails();
            //        });
            //};

            //$scope.getCurrentPagePostDetails = function () {
            //    for (var i = $scope.pageIndex; i <= $scope.itemsPerPage; i++) {
            //        if (i < $scope.posts.length) {

            //            $scope.posts[i].getDetailsAsync = contentApi
            //                .getPostDetails($scope.posts[i], i)
            //                .then(function (postDetails) {
            //                    $scope.setPostDetails(postDetails);
            //                });
            //        }
            //    }
            //};

            //$scope.setPostDetails = function (postDetails) {
            //    $scope.posts[postDetails.id].details = postDetails;
            //    $scope.posts[postDetails.id].details.setContentApi(contentApi);

            //    if (_.isString(postDetails.infoLink)) {
            //        $scope.posts[postDetails.id].getDetailsAsync = contentApi
            //            .getText(postDetails.infoLink)
            //            .then(function (response) {
            //                $scope.posts[postDetails.id].details.set(response);
            //            });
            //    }

            //    if (_.isString(postDetails.photoAlbumPath)) {
            //        $scope.posts[postDetails.id].getPhotosAsync = contentApi
            //            .getContentItems(postDetails.photoAlbumPath)
            //            .then(function (photos) {
            //                $scope.posts[postDetails.id].details.addPhotos(photos);
            //            });
            //    }
            //};

            //$scope.getAllPosts();

            $scope.albumManager = new AlbumManager();
            $scope.currentSongLyrics = '';
            $scope.currentSongTitle = '';
            $scope.currentAlbum = null;

            $scope.$on('track:id', function () {
                var trackdata = angularPlayer.currentTrackData();
                $scope.currentSongLyrics = trackdata.lyrics;
                $scope.currentSongTitle = trackdata.title;
            });

            $scope.setAlbum = function (index) {
                var album = $scope.albumManager.albums[index];
                $scope.currentAlbum = album;

                _.map($scope.currentAlbum.songs,
                    function (song) {
                        angularPlayer.addTrack(song);
                    });
            };

            $scope.initPlayer = function () {
                if ($scope.isPlayerInitialized()) {
                    return;
                }

                $scope.initSoundManager();
                $scope.setAlbum(0);
            };
            $scope.isPlayerInitialized = function () {
                return $scope.currentAlbum !== null;
            };

            $scope.getSongClass = function (title) {
                if (!$scope.isPlayerInitialized()) {
                    return '';
                }

                var trackdata = angularPlayer.currentTrackData();
                if (trackdata.title === title) {
                    return 'current-song';
                }
                return '';
            };

            $scope.getAlbumClass = function (title) {
                if (!$scope.isPlayerInitialized()) {
                    return '';
                }

                if ($scope.currentAlbum.title === title) {
                    return 'active';
                }
                return '';
            };
        }];

    module.controller('mainController', _controller);
})(angular.module('mpisaApp'));