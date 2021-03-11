
import authService from '../services/authService';
import { store } from '../state';
import { setCurrentUser } from '../state/action-creators/auth';

const setTokenAlwaysToHeader = () => {
  const token = authService.getToken();
  const currentUser = authService.getCurrentUser();
  if (token) {
      authService.setAuthToken(token);
      store.dispatch(setCurrentUser(currentUser));
      const currentTime = Date.now() / 1000;
    //   if (currentUser.exp < currentTime) {
    //     store.dispatch({
    //         type: 'SESSION_LOGOUT'
    //       });
    //       window.location.href = '/login';
    //   }
  }
}

export default setTokenAlwaysToHeader;

