import decode from 'jwt-decode';


class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token){
      return
    }
    return decode(token);
  }

  loggedIn() {
    const token = this.getToken();
    if (!token){
      return false
    }
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token')||'';
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);

  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();
