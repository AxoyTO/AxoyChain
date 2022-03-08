const { INITIAL_BALANCE } = require('../config')
const { ec, cryptoHash } = require('../util')
const Transaction = require('./transaction')

class Wallet {
    constructor(publicKey) {
        this.balance = INITIAL_BALANCE

        this.keyPair = ec.genKeyPair()

        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({ recipient, amount }) {
        if (amount > this.balance) {
            throw new Error(`Amount:${amount} exceeds balance:${this.balance}`)
        }

        return new Transaction({ senderWallet: this, recipient, amount })
    }
}

module.exports = Wallet