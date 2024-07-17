class AccessError extends Error {
    constructor(isLoggedIn) {
      super("Access denied");
      this.status = isLoggedIn ? 403 : 401
    }
  }
  
  module.exports = AccessError;