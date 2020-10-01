const nacl = require('libsodium-wrappers')
module.exports = (key) => {
    return Object.freeze({
        decrypt: (ciphertext, nonce) => {
            
            if (key === false ) {
                throw  new Error("no key")}
            return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key);
        }
    })
}