// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user is logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        this.handleTimeout()
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(data) {
    localStorage.setItem('id_token', data.token);
    localStorage.setItem('user_id', data.user._id);
    const user_id = data.user._id;
    window.location.assign(`/books/${user_id}`);
    // window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }

  handleTimeout() {
    // if token expires before user logs out, alert user and return to login page
    localStorage.removeItem('id_token');
    window.location.assign('/login')
    alert('Your login has expired, please login again!');
  }
}

export default new AuthService();
