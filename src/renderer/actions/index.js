const setPrinter = (printer) => ({
    type: 'SET_PRINTER',
    printer
});

const setPrintOn = (value) => ({
    type: 'SET_PRINT_ON',
    value
});

const setPusherApiKey = (apikey) => ({
    type: 'SET_PUSHER_APIKEY',
    apikey
});

const setPusherCluster = (cluster) => ({
    type: 'SET_PUSHER_CLUSTER',
    cluster
});

const setPusherChannel = (channel) => ({
    type: 'SET_PUSHER_CHANNEL',
    channel
});


const setOnline = (value) => ({
    type: 'SET_ONLINE',
    value
});

const setPusherReady = (value) =>({
    type: 'SET_PUSHER_READY',
    value
});

export {
    setPrinter,
    setPrintOn,
    setPusherApiKey,
    setPusherCluster,
    setPusherChannel,
    setOnline,
    setPusherReady,
};