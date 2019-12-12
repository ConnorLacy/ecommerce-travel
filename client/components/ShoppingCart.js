import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import {Link } from 'react-router-dom';



export default class ShoppingCart extends React.Component{
    constructor(){
        super();
        this.state = {
            
        }
    }


    componentDidMount(){
        // console.log(this.props.cartProp)
        // this.setState({
        //     cart: this.props.cartProp,
        // });
    }

    render(){
        return(
            <div className="cart">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand>ParkWeb</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link >Features</Nav.Link>
                            <Nav.Link >Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
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
                {/* <Tile rental={this.state.cart}/>                 */}
            </div>
        );
    }
}