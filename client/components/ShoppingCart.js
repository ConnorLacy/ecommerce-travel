import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
import Axios from 'axios';
var querystring = require('querystring')
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {withRouter, Link } from 'react-router-dom';
import {cart} from '../cart';



class ShoppingCart extends React.Component{
    constructor(){
        super();
        this.state = {
            _id: '',
            year: '',
            make: '',
            model: '',
            description: '',
            amount: '',
            available: '',
            isSubmitted: false,
        }
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.update = this.update.bind(this);

        this.fname = React.createRef();
        this.lname = React.createRef();
        this.email = React.createRef();
        this.address = React.createRef();
        this.city = React.createRef();
        this.state = React.createRef();
        this.cardno = React.createRef();
        this.cvv = React.createRef();

    }

    componentDidMount(){
        this.setState({
            _id: cart._id,
            year: cart.year,
            make: cart.make,
            model: cart.model,
            description: cart.description,
            amount: cart.amount,
            available: cart.available,
        });
    }

    handleFormSubmission(e){
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(e.target)
        if(form.checkValidity()===false){
            alert('Please fill out all required fields');
            e.preventDefault();
            e.stopPropogation();
        }
        else {
            this.setState({
                isSubmitted: true,
            })
            this.update(this, 'no')
        }
    }

    update(e, available){
        Axios.post('/update', querystring.stringify({
            _id: e.state._id,
            year: e.state.year,
            make: e.state.make,
            model: e.state.model,
            description: e.state.description,
            amount: e.state.amount,
            available: available
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            e.setState({
                messageFromServer: response.data
            });
        }).catch((thrown) => {
            if(Axios.isCancel(thrown)){
                console.log('Request Cancelled', thrown.message);
            }
            else{
                console.log('Error. Something happened');
            }
        });
    }

    render(){
        if(!this.state.isSubmitted){
            return(
                <div className={(!this.state.isSubmitted) ? "cart-split" : "cart-single"}>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand>ParkWeb</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse _id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                <Nav.Link >Features</Nav.Link>
                                <Nav.Link >Pricing</Nav.Link>
                                <NavDropdown title="Dropdown" _id="collasible-nav-dropdown">
                                    <NavDropdown.Item >Action</NavDropdown.Item>
                                    <NavDropdown.Item >Another action</NavDropdown.Item>
                                    <NavDropdown.Item >Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >Separated link</NavDropdown.Item>
                                </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <Button variant="primary">
                                        <Link to="/login" style={{ fontWeight: "Bold", color: 'white'}}>Login</Link>
                                    </Button>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Link to="/cart">
                                        <Button variant="success">
                                            <span className="fa fa-shopping-cart">
                                                
                                            </span>
                                        </Button>
                                    </Link>
                                </Form>
                            </Navbar.Collapse>
                            </Navbar>
                    <div className="below-nav">
                    <h1>Ready to checkout?</h1>
                    <div className="half-container">
                        <div className="left-half">
                            <Tile rentalProp={{...this.state}} key={this.state._id}  hasButton={false}/>
                        </div>
                            <Form onSubmit={this.handleFormSubmission} className="right-half">
                                <h1>Submit Order</h1>
                                <Form.Group controlId="fname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control name="fname" type="text" placeholder="John" ref={this.fname}/>
                                </Form.Group>
                                <Form.Group controlId="lname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control name="lname" type="text" placeholder="Doe" />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control name="address" type="text" placeholder="1234 Place St" />
                                </Form.Group>
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name="city" type="text" placeholder="Atlanta" />
                                </Form.Group>
                                <Form.Group controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control name="state" type="text" placeholder="Georgia" />
                                </Form.Group>
                                <hr/>
                                <Form.Group controlId="cardno">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control name="cardno" type="number" placeholder="4400123456789123" />
                                </Form.Group>
                                <Form.Group controlId="cvv">
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control name="cvv" type="number" placeholder="123" />
                                </Form.Group>
                                <Button variant="success" type="submit" size="md" className="cart-checkout" style={{width: '20%'}}>Confirm</Button>
                            </Form>
                    </div>
                </div>
                </div>
            );
        }

        else {
            return (
                <div className="cart-single">
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand>ParkWeb</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse _id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                <Nav.Link >Features</Nav.Link>
                                <Nav.Link >Pricing</Nav.Link>
                                <NavDropdown title="Dropdown" _id="collasible-nav-dropdown">
                                    <NavDropdown.Item >Action</NavDropdown.Item>
                                    <NavDropdown.Item >Another action</NavDropdown.Item>
                                    <NavDropdown.Item >Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item >Separated link</NavDropdown.Item>
                                </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <Button variant="primary">
                                        <Link to="/login" style={{ fontWeight: "Bold", color: 'white'}}>Login</Link>
                                    </Button>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Link to="/cart">
                                        <Button variant="success">
                                            <span className="fa fa-shopping-cart">
                                                
                                            </span>
                                        </Button>
                                    </Link>
                                </Form>
                            </Navbar.Collapse>
                            </Navbar>
                        <div className="below-nav">
                        <h1>Thanks for Renting with us!</h1>
                        <Tile rentalProp={{...this.state}} key={this.state._id} hasButton={false}/>
                        <Button variant="primary" type="submit" size="md">
                            <Link to="/" style={{color: 'white'}}>Return to Listings</Link>
                        </Button>
                        </div>
                    </div>
            );

        }
       
    }
}

export default withRouter(ShoppingCart);