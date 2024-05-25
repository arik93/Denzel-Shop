import { appAPI } from "../../API/API";

const SET_SESSION = 'SESSION';
const SET_APP_LANGUAGE = 'SET_APP_LANGUAGE';

const initialState = {
  hasSession: false,
  appLanguage: 1
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_LANGUAGE:
      return {
        ...state,
        appLanguage: action.languageId
      }

    case SET_SESSION:
      return {
        ...state,
        hasSession: action.session
      }
      
    default:
      return state;
  }
};

//Actions
export const setAppLanguage = (languageId) => {
  return {
    type: SET_APP_LANGUAGE,
    languageId
  }
};

export const setSession = (session) => {
  return {
    type: SET_SESSION,
    session
  }
};


//Thunks
export const getSession = () => {
  return (
    async (dispatch) => {
      const response = await appAPI.getSession();
      return response;
    }
  )
};

export default AppReducer;