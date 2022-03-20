import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

class App extends Component {
    state = { walletInfo: {} };

    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }

    render() {
        const { address, balance } = this.state.walletInfo;

        return (
            <div className='App'>
                <img className='logo' src={logo}></img>
                <br />
                <div>
                    Welcome to AxoyChain!<br />
                    Main token of AxoyChain is AxoyCoin with ticker symbol AXC
                </div>
                <br />
                <div>
                    <br />
                    <span class="block"></span>
                    <Link to='/blocks'>Blocks</Link>
                </div>
                <div><span class="money"></span><Link to='/conduct-transaction'>Conduct a Transaction</Link></div>
                <div><span class="bank"></span><Link to='/transaction-pool'>Transaction Pool</Link></div>
                <br />
                <div className='WalletInfo'>
                    <br />
                    <div><span class="case"></span>Wallet Address: {address}</div>
                    <div><span class="coin"></span>Balance: {balance} AXC</div>
                </div>
            </div>
        );
    }
}

export default App;