const nacl = require('libsodium-wrappers')
module.exports =async (key) => {
    await nacl.ready;
    
    return Object.freeze({
        
        encrypt: (ciphertext, nonce) => {
            
            
            return nacl.crypto_secretbox_easy(ciphertext, nonce, key);
        }
    });
}