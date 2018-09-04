const printer = (state = {printer:null}, action) => {
    switch(action.type) {
        case 'SET_PRINTER': 
            return  Object.assign({}, state, {
            printer: action.printer
          })
        default:
            return state;
    }
}

export default printer;