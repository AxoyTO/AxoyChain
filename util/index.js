const EC = require('elliptic').ec
//Elliptic Curve Cryptography

const cryptoHash = require('./crypto-hash')

const ec = new EC('secp256k1')
//Standards of Efficient Cryptography - Prime 256 Bits "Koblitz"

const verifySignature = ({ publicKey, data, signature }) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex')

    return keyFromPublic.verify(cryptoHash(data), signature)
}

module.exports = { ec, verifySignature }

