function TimeoutError(message) {
    this.name = 'TimeoutError';
    this.message = message;
    this.stack = (new Error()).stack;
}

TimeoutError.prototype = new Error;


function timeoutPromise(timeout, promise) {
    var wrapPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new TimeoutError('promise timeout ' + timeout + ' ms'));
        }, timeout);
    });

    return Promise.race([promise, wrapPromise]);
}

module.exports = {
    timeoutPromise: timeoutPromise,
    TimeoutError: TimeoutError
};