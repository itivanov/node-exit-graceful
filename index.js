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

// Do app specific cleaning before exiting.
process.once('beforeExit', function () {
    process.emit('cleanup');
});

// PM2 Cluster shutdown message.
process.on('message', function (msg) {
    if (msg === 'shutdown') {
        process.exit(0);
    }
});

// Catch SIGHUP event and exit normally.
process.once('SIGHUP', function () {
    console.log('SIGHUP');
    process.exit(1);
});

// Catch SIGINT event and exit normally.
process.once('SIGINT', function () {
    console.log('SIGINT');
    process.exit(2);
});

// Catch SIGQUIT event and exit normally.
process.once('SIGQUIT', function () {
    console.log('SIGQUIT');
    process.exit(3);
});

// Catch SIGABRT event and exit normally.
process.once('SIGABRT', function () {
    console.log('SIGABRT');
    process.exit(6);
});

// Catch SIGBREAK event and exit normally.
process.once('SIGBREAK', function () {
    console.log('SIGBREAK');
    process.exit(6);
});

// Catch SIGTERM event and exit normally.
process.once('SIGTERM', function () {
    console.log('SIGTERM');
    process.exit(15);
});

// Catch uncaught exceptions and exit normally.
process.once('uncaughtException', function (e) {
    console.log('Uncaught Exception');
    console.log(e.stack);
    process.exit(99);
});

module.exports = shutdown;
