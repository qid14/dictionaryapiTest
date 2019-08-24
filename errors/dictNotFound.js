module.exports = class DictionaryNotFoundError extends Error {
    constructor (message) {
    
      super(message);
  
      Error.captureStackTrace(this, this.constructor);
    
      this.name = 'DictionaryNotFoundError';
    }
};