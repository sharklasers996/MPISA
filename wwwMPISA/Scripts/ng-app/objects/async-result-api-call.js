
var AsyncResultApiCall = function (q, http, request, resultFunction) {
    this.q = q;
    this.request = request;
    this.resultFunction = resultFunction;
    this.http = http;
};

AsyncResultApiCall.prototype = {
    call: function () {
        var _self = this;

        var _deferred = _self.q.defer();
        var _asyncResult = new AsyncResult(_deferred.promise);

        _self.http(_self.request)
            .then(function (response) {
                _asyncResult.isInProgress = false;

                try {
                    _asyncResult.result = _self.resultFunction(response.data);
                    _deferred.resolve(_asyncResult.result);
                } catch (_e) {
                    _deferred.reject(_e);
                }
            })

        return _asyncResult;
    }
};