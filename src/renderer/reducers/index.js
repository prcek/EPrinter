import { combineReducers } from 'redux';
import pusher from './pusher';
import printer from './printer';
import status from './status';


export default combineReducers({
    printer,
    pusher,
    status
});


