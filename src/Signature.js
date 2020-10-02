const nacl = require('libsodium-wrappers')

module.exports = async () => {
    await nacl.ready;
    return Object.freeze({
        verifyingKey:"nacl.crypto_sign_keypair()"
           
          
        ,

        sign: (msg) => {
            console.log(Object.verifyingKey);


            return nacl.crypto_sign(msg,Object.verifyingKey);

        }
    })
}
