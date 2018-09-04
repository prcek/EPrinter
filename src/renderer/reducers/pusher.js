const pusher = (state = {apikey:null,cluster:"eu",channel:null}, action) => {
    switch(action.type) {
        case 'SET_PUSHER_APIKEY': 
            return  Object.assign({}, state, {
                apikey: action.apikey
            });
        case 'SET_PUSHER_CLUSTER': 
            return  Object.assign({}, state, {
                cluster: action.cluster
            });
        case 'SET_PUSHER_CHANNEL': 
            return  Object.assign({}, state, {
                channel: action.channel
            });
        default:
            return state;
    }
}

export default pusher;