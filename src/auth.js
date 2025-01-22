import http from './http'; 
import { getJwt, tokenKey, decryptobj } from './helpers'; 
import jwtDecode from 'jwt-decode'; 
import { logout } from './auth'; 


export function getCurrentUser() {
  const jwt = getJwt();
  if (jwt) {
    http.setJwt(jwt);

    try {
      const token = localStorage.getItem(tokenKey);

      if (token) {
        const decryptedToken = decryptobj(token);
        const decodedToken = jwtDecode(decryptedToken);

        if (decodedToken.exp >= Date.now() / 1000) {
          return decodedToken;
        } else {
          logout();
          return null; 
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; 
    }
  } else {
    return null; 
  }
}
