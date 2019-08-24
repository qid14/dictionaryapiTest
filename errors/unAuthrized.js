module.exports = class UnAuthrizedError extends Error {
    constructor (message) {
    
      super(message);
  
      Error.captureStackTrace(this, this.constructor);
    
      this.name = 'UnauthrizedError';
    }
    
  };