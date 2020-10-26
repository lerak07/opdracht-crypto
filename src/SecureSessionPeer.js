const nacl= require('libsodium-wrappers')
const encryptor = require('./Encryptor')
const decryptor = require('./Decryptor')
module.exports	= async (peer =null) => {
    await nacl.ready;
    let nacl2= nacl;
    const {publicKey, privateKey} = nacl2.crypto_kx_keypair();
    
    let sessKeys, secureSessPeer ={},encrypt,decrypt,msgPeer;

    if(peer){
        secureSessPeer=peer;
        
        sessKeys ={
            sharedTx,
            sharedRx
        }= nacl2.crypto_kx_server_session_keys(publicKey,privateKey,peer.publicKey);
        encrypt = await encryptor(sessKeys.sharedTx);
        decrypt =await decryptor(sessKeys.sharedRx);
        await peer.connect(publicKey);

    }

    let tempobj= {}   

    tempobj.publicKey = publicKey;

    tempobj.setSess = (sess) =>{
        secureSessPeer = sess;
    }
    tempobj.encrypt = (msg) =>{
            const nonce = nacl2.randombytes_buf(nacl2.crypto_secretbox_NONCEBYTES);
            const ciphertext = encrypt.encrypt(msg,nonce);
            return {ciphertext,nonce};
    }

    tempobj.decrypt= (ciphertext,nonce) =>{
        return decrypt.decrypt(ciphertext, nonce);
    }

    tempobj.connect = async(otherPublicKey) =>{
        sessKeys ={
            sharedTx,
            sharedRx
        }= nacl2.crypto_kx_client_session_keys(publicKey,privateKey,otherPublicKey);
        encrypt = await encryptor(sessKeys.sharedTx);
        decrypt =await decryptor(sessKeys.sharedRx);


    }
    tempobj.setMsg = (msg) =>{
        msgPeer= msg;
    } 
    tempobj.send = (msg) =>{
      let encrypted = tempobj.encrypt(msg);
      secureSessPeer.setMsg(encrypted);
    };
    tempobj.receive = () =>{
        return tempobj.decrypt(msgPeer.ciphertext, msgPeer.nonce);
    }

    if(peer){
        peer.setSess(tempobj);
    }

    
    return Object.freeze(tempobj);

}

