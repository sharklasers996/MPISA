(function (module) {
    var _service = [
        '$http', '$q', '$location',
        function ($http, $q, $location) {

            function _getPosts() {
                var request = ({
                    method: "get",
                    url: window.location.href + "content.php?path=Content/Posts"
                });

                return new AsyncResultApiCall($q, $http,
                  request,
                  function (response) {
                      return _.map(response,
                          function (item) {
                              return new Post(item);
                          });
                  }).call();
            };

            function _getPostDetails(post, id) {
                var request = ({
                    method: "get",
                    url: window.location.href + "content.php?path=" + post.path
                });

                return new AsyncResultApiCall($q, $http,
                     request,
                     function (response) {
                         var postDetails = new PostDetails(id);

                         _.map(response,
                             function (item) {
                                 postDetails.extend(item);
                             });

                         return postDetails;
                     }).call();
            };

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

            function _getImageBytes(link) {
                var request = ({
                    method: "get",
                    url: link,
                    responseType: "arraybuffer"
                });

                return new AsyncResultApiCall($q, $http,
                      request,
                      function (response) {
                          return response;
                      }).call();
            }

            return {
                getPosts: _getPosts,
                getPostDetails: _getPostDetails,
                getContentItems: _getContentItems,
                getText: _getText,
                getImageBytes: _getImageBytes
            }
        }];


    module.factory('contentApi', _service);
})(angular.module('mpisaApp'));