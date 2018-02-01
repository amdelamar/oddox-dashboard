export default {
  encode (str) {
    // ucs-2 string to base64 encoded ascii
    return btoa(unescape(encodeURIComponent(str)))
  },

  decode (str) {
    // base64 encoded ascii to ucs-2 string
    return decodeURIComponent(escape(atob(str)))
  }
}
