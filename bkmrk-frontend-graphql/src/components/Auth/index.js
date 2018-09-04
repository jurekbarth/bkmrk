// Base64 Decode more information: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  // eslint-disable-block
  const a = atob(str)
    .split('')
    .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
    .join('');
  return decodeURIComponent(a);
}

const Auth = {
  isAuthenticated: () => {
    try {
      const token = localStorage.getItem('token');
      if (token === null) {
        return false;
      }
      const arr = token.split('.');
      const dataStr = arr[1];
      const data = JSON.parse(b64DecodeUnicode(dataStr));
      const currentDate = new Date();
      const tokenExpiration = new Date(data.exp * 1000);
      if (currentDate < tokenExpiration) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  setToken(token) {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  },
  removeToken() {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.log(error);
    }
  },
};

export default Auth;
