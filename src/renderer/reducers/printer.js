const printer = (state = {printer:null,print_on:false}, action) => {
    switch(action.type) {
        case 'SET_PRINTER': 
            return  Object.assign({}, state, {
            printer: action.printer
          })
        case 'SET_PRINT_ON': 
          return  Object.assign({}, state, {
            print_on: action.value
          });
        default:
            return state;
    }
}

export default printer;