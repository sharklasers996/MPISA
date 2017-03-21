(function (module) {
    var _controller = [
        '$scope', 'contentApi', 'angularPlayer', '$filter',
        function ($scope, contentApi, angularPlayer, $filter) {


            $scope.initSoundManager = function () {
                angularPlayer.init();
                $scope.$on('track:progress', function (event, data) {
                    $scope.$apply(function () {
                        $scope.progress = data;
                    });
                });
                $scope.$on('track:id', function (event, data) {
                    $scope.$apply(function () {
                        $scope.currentPlaying = angularPlayer.currentTrackData();
                    });
                });
                $scope.$on('currentTrack:position', function (event, data) {
                    $scope.$apply(function () {
                        $scope.currentPostion = $filter('humanTime')(data);
                    });
                });
                $scope.$on('currentTrack:duration', function (event, data) {
                    $scope.$apply(function () {
                        $scope.currentDuration = $filter('humanTime')(data);
                    });
                });
                $scope.isPlaying = false;
                $scope.$on('music:isPlaying', function (event, data) {
                    $scope.$apply(function () {
                        $scope.isPlaying = data;
                    });
                });
                $scope.playlist = angularPlayer.getPlaylist(); //on load
                $scope.$on('player:playlist', function (event, data) {
                    $scope.$apply(function () {
                        $scope.playlist = data;
                    });
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
                $scope.posts[postDetails.id].details.setContentApi(contentApi);

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
                        });
                }
            };

            $scope.getAllPosts();

            $scope.albumManager = new AlbumManager();
            $scope.currentSongLyrics = '';
            $scope.currentAlbum = null;

            $scope.$on('track:id', function () {
                var trackdata = angularPlayer.currentTrackData();
                $scope.currentSongLyrics = trackdata.lyrics;
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