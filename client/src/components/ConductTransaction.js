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
                <Link to='/'>Home</Link>
                <h3>Conduct a Transaction</h3>
                <br />
                <h4>Known Addresses</h4>
                {
                    this.state.knownAddresses.map(knownAddress => {
                        return (
                            <div key={knownAddress}>
                                <div>{knownAddress}</div>
                                <br />
                            </div>
                        );
                    })
                }
                <br />

                <Form>
                    <FormGroup>
                        <FormLabel>Recipient Wallet Address:</FormLabel>
                        <FormControl
                            input='text'
                            placeholder="Enter recipient's wallet address"
                            value={this.state.recipient}
                            onChange={this.updateRecipient}
                        />
                        <FormText>
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
                <div>
                    <Button
                        variant="danger"
                        onClick={this.conductTransaction}
                    >
                        Submit
                    </Button>

                </div>
            </div>
        )
    }
};

export default ConductTransaction;