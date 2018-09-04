const setPrinter = (printer) => ({
    type: 'SET_PRINTER',
    printer
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

export {
    setPrinter,
    setPusherApiKey,
    setPusherCluster,
    setPusherChannel
};