const status = (state = {printer_ready:null,pusher_ready:null,online:null}, action) => {
    switch(action.type) {
        case 'SET_PRINTER_READY': 
            return  Object.assign({}, state, {
                printer_ready: action.value
            });
        case 'SET_PUSHER_READY': 
            return  Object.assign({}, state, {
              pusher_ready: action.value
            });
        case 'SET_ONLINE': 
            return  Object.assign({}, state, {
              online: action.value
            });
        default:
            return state;
    }
}

export default status;