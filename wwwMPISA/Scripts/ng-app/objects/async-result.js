var AsyncResult = function (promise) {
    this.promise = null;		
    this.isInProgress = true;	
    this.result = null;			

    if (_.isObject(promise)) {
        this.promise = promise;
    }
};

AsyncResult.prototype = {
    then: function (successCallback, errorCallback, notifyCallback) {
        this.promise = this.promise.then(successCallback, errorCallback, notifyCallback);
        return this;
    },
    catch: function (errorCallback) {
        this.promise = this.promise.catch(errorCallback);
        return this;
    },
    finally: function (callback, notifyCallback) {
        this.promise = this.promise.finally(callback, notifyCallback);
        return this;
    }
};