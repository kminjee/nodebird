

export const initialState = {
  isLoggedIn: false,
  user: null,
  signupData: {},
  loginData: {}
}

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data
  }
}

export const logoutAction = () => {
  return {
    type: 'LOG_OUT'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        uesr: action.data
      };

    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        uesr: null
      };

    default:
      return state;
  }
}

export default reducer;