/* eslint-disable no-undef */
import CryptoJS from "crypto-js";
const password = import.meta.env.VITE_CRYPTO_PASS;
const salt = import.meta.env.VITE_CRYPTO_SALT;
console.log(password,"posws-------");

var key = CryptoJS.PBKDF2(password, salt, {
  keySize: 256 / 32,
  iterations: 100,
});

const helpers = {
  encrypt: function (text) {
    try {
      return CryptoJS.AES.encrypt(text, key.toString()).toString();
    } catch (error) {
      return error;
    }
  },

  encryptobj: function (obj) {
    try {
      return CryptoJS.AES.encrypt(
        JSON.stringify(obj),
        key.toString()
      ).toString();
    } catch (error) {
      return error;
    }
  },

  decrypt: function (encdata) {
    try {
      const datat = CryptoJS.AES.decrypt(encdata, key.toString());
      return datat.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return error;
    }
  },

  decryptobj: function (encdata) {
    try {
      const datatt = CryptoJS.AES.decrypt(encdata, key.toString());
      return JSON.parse(datatt.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      return error;
    }
  },

};

export default helpers;
