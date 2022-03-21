const MINE_RATE = 1000; //ms
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: 'None',
    hash: 'Genesis-Block-Hash',
    nonce: 1,
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

const INITIAL_BALANCE = 1000

const REWARD_INPUT = {
    address: '*miner-block-reward*'
}

const MINING_REWARD = 50

module.exports = {
    GENESIS_DATA,
    MINE_RATE,
    INITIAL_BALANCE,
    REWARD_INPUT,
    MINING_REWARD
};
