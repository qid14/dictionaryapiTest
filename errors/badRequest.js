module.exports = class BadRequestError extends Error {
    constructor (message) {
    
      super(message);
  
      Error.captureStackTrace(this, this.constructor);
    
      this.name = 'BadRequestError';
    }
};