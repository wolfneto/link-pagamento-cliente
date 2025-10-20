import Vue from 'vue';
var CryptoJS = require("crypto-js");

var auth = CryptoJS.AES.encrypt('}$~JcZH.v,I+', 'inthefade').toString();

Vue.prototype.$crypto = CryptoJS;
Vue.prototype.$crypto_key = "inthefade";
Vue.prototype.$crypto_pass = "}$~JcZH.v,I+";
Vue.prototype.$crypto_auth = auth;

Vue.prototype.$crypto_encrypt = function(value) {
    value = CryptoJS.AES.encrypt(value, 'inthefade').toString();
    return value;
};

Vue.prototype.$crypto_decrypt = function(value) {
    value = CryptoJS.AES.decrypt(value, 'inthefade');
    if (typeof value == 'object') {
        return JSON.parse(value.toString(CryptoJS.enc.Utf8))
    }
    return value.toString(CryptoJS.enc.Utf8);
};