const { GENESIS_DATA, MINE_RATE } = require('../config');
const crypto = require('crypto');
const hexToBinary = require('hex-to-binary')
const { time } = require('console');
const { cryptoHash } = require('../util');

class Block {
    constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis() {
        return new Block(GENESIS_DATA);
    }

    static mineBlock({ lastBlock, data }) {
        const lastHash = lastBlock.hash;
        let hash, timestamp;
        let nonce = 0;
        let { difficulty } = lastBlock;

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
            hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this({ timestamp, lastHash, data, difficulty, nonce, hash });
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;

        if (difficulty < 2)
            return 1;

        if ((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty - 1;

        return difficulty + 1;
    }
}

module.exports = Block;