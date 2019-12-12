import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
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
        }
    }

    componentDidMount(){
        console.log('Shopping cart: ');
        console.log(cart);

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

    render(){
        return(
            <div className="cart">
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
                <h1>Ready to checkout?</h1>
                <Tile rentalProp={{...this.state}} key={this.state._id}  hasButton={false}/>
            </div>
        );
    }
}

export default withRouter(ShoppingCart);