const MINE_RATE = 1000; //ms
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '-----',
    hash: 'hash-one',
    nonce: 1,
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

const INITIAL_BALANCE = 1000

module.exports = { GENESIS_DATA, MINE_RATE, INITIAL_BALANCE };