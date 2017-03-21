(function (module) {

    var _filter = function () {
        return function (posts, menuIndex) {

            var output = [];

            _.map(posts,
                function (post) {
                    if (menuIndex === 0
                        && post.isPhotoAlbum) {
                        return;
                    }

                    if (menuIndex === 1
                      && !post.isPhotoAlbum) {
                        return;
                    }

                    output.push(post);
                });

            return output;
        };
    };

    module.filter('postFilter', _filter);
})(angular.module('mpisaApp'));