
import {combineReducers} from 'redux';

const INIT_STATE={
    claim:{}
}


const claimInfo = (state = INIT_STATE, action) => {
    switch (action.type) {


      case 'SAVE_CLAIM':

        console.warn("BUG-A",action);

        
        return {
          ...state,
          claim: action.payload,
        };
  
        return {
          ...state,
          token: action.payload,
        };
      default:
        return state;
    }
  };




export default combineReducers({
    claimInfo
});
  