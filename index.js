function NetworkError(message) {
    this.name = 'NetworkError';
    this.message = message;
    this.stack = (new Error()).stack;
}

NetworkError.prototype = new Error;


function timeoutPromise(timeout, promise) {
    var wrapPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new NetworkError('Network timeout ' + timeout + ' ms'));
        }, timeout);
    });

    return Promise.race([promise, wrapPromise]);
}

module.exports = {
    timeoutPromise: timeoutPromise,
    NetworkError: NetworkError
};