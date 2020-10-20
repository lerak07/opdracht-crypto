const nacl= require('libsodium-wrappers')
const encryptor = require('./Encryptor.js')
const decryptor = require('./Decryptor.js')
module.exports	= async () => {
    await nacl.ready;
    const {publicKey, privateKey} = nacl.crypto_kx_keypair();

    return Object.freeze({
        publicKey: publicKey,
        encrypt: (msg) =>{
            const nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
            const ciphertext = encryptor(msg,nonce)
            return {ciphertext,nonce}

        },
        decrypt: (ciphertext,nonce) =>{
           return  decryptor(ciphertext,nonce);
        }
        
    })

}