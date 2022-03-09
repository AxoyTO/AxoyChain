const PubNub = require("pubnub")

const credentials = {
    publishKey: "pub-c-8e1a4b3a-ea18-4599-bb78-34e77efadb42",
    subscribeKey: "sub-c-e12b7702-8286-11ec-9f2b-a2cedba671e8",
    secretKey: "sec-c-NWM2NGRmOWUtMjhlYS00ODFhLTgzNWQtOGFhNGFkYWYwNzRj",
    uuid: "AxoyTO"
}

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
};

class PubSub {
    constructor({ blockchain, transactionPool, wallet }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.listener());
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }

    subscribeToChannels() {
        this.pubnub.subscribe({
            channels: [Object.values(CHANNELS)]
        });
    }

    listener() {
        return {
            message: messageObject => {
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
                const parsedMessage = JSON.parse(message);

                switch (channel) {
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage, () => {
                            this.transactionPool.clearBlockchainTransactions(
                                { chain: parsedMessage }
                            );
                        });
                        break;
                    case CHANNELS.TRANSACTION:
                        this.transactionPool.setTransaction(parsedMessage);
                        break;
                    default:
                        return;
                }
            }
        }
    }

    publish({ channel, message }) {
        /*
        this.pubnub.unsubscribe(channel, () => {
            this.pubnub.publish({ message, channel }, () => {
                this.pubnub.subscribe(channel)
            });
        })
        */

        //POTENTIAL BUG
        this.pubnub.unsubscribeAll(channel);
        this.pubnub.publish({ message, channel });

        //UNNECESSARY SUBSCRIBE
        //this.pubnub.subscribe(channel);
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify(transaction)
        });
    }
}

module.exports = PubSub;
