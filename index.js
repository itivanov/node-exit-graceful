'use strict';

function empty() {
}

// Attach user callback to the process event emitter.
// If no callback, it will still exit gracefully
function shutdown(callback) {
    callback = callback || empty;

    process.once('cleanup', callback);
}

// Do app specific cleaning before exiting.
process.once('exit', function () {
    process.emit('cleanup');
});

// PM2 Cluster shutdown message.
process.on('message', function (msg) {
    if (msg === 'shutdown') {
        process.exit(1);
    }
});

// Catch SIGINT event and exit normally.
process.once('SIGINT', function () {
    console.log('SIGINT');
    process.exit(2);
});

// Catch SIGTERM event and exit normally.
process.once('SIGTERM', function () {
    console.log('SIGTERM');
    process.exit(3);
});

// Catch uncaught exceptions and exit normally.
process.once('uncaughtException', function (e) {
    console.log('Uncaught Exception');
    console.log(e.stack);
    process.exit(99);
});

module.exports = shutdown;
