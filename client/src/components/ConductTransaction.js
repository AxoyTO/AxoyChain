import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, FormText, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class ConductTransaction extends Component {
    state = { recipient: '', amount: 0, knownAddresses: [] };

    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(response => response.json())
            .then(json => this.setState({ knownAddresses: json }));
    }

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    conductTransaction = () => {
        const { recipient, amount } = this.state;

        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
            .then(json => {
                alert(json.message || json.type);
                history.push('/transaction-pool');
            });
    }

    render() {
        return (
            <div className='ConductTransaction'>
                <div>
                    <span class="home"></span>
                    <Link to='/'>Home</Link>
                </div>
                <h3>Conduct a Transaction</h3>
                <br />
                <div className='addressBook' id="addressBook">
                    <p><i
                        class="qtip tip-right"
                        data-tip="Unique wallet addresses with non-empty transaction history are added to the address book"
                    >
                        <span class="addrbook"></span>Address Book</i>
                    </p>


                    {
                        this.state.knownAddresses.map(knownAddress => {
                            return (
                                <ul>
                                    <div key={knownAddress}>
                                        <div><li>{knownAddress}</li></div>
                                    </div>
                                </ul>
                            );
                        })
                    }
                    <br />
                </div>
                <div className='TxForm'>
                    <Form>
                        <FormGroup>
                            <FormLabel>Recipient Wallet Address:</FormLabel>
                            <FormControl
                                input='text'
                                placeholder="Enter recipient's wallet address"
                                value={this.state.recipient}
                                onChange={this.updateRecipient}
                            />
                            <FormText className="text-muted">
                                <span class="attention"></span>Make sure the wallet address exists and is correct!
                            </FormText>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Amount:</FormLabel>
                            <FormControl
                                input='number'
                                placeholder='Enter amount'
                                value={this.state.amount}
                                onChange={this.updateAmount}
                            />
                        </FormGroup>
                    </Form>
                </div>
                <div>
                    <br />
                    <Button
                        variant="danger"
                        onClick={this.conductTransaction}
                        type="submit"
                    >
                        <span class="money"> </span>
                        Submit
                    </Button>

                </div>
            </div >
        )
    }
};

export default ConductTransaction;

