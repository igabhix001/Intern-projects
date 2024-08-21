import crypto from 'crypto';


//hashing via scrypt not used but prefer this for security!


// Utility function to hash a password
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the password with the salt
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      // Combine salt and hash
      resolve(salt + ':' + derivedKey.toString('hex'));
    });
  });
};


// Utility function to verify a password
export const verifyPassword = (password, storedHash) => {
  return new Promise((resolve, reject) => {
    // Separate salt and hash
    const [salt, hash] = storedHash.split(':');

    // Hash the password with the same salt
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      // Compare the hash with the stored hash
      resolve(derivedKey.toString('hex') === hash);
    });
  });
};
