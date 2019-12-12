import React from 'react';
import ReactDOM from 'react-dom'
import Axios from 'axios';
import Tile from './Tile';
import {withRouter} from 'react-router-dom'
import {Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import ShoppingCart from './ShoppingCart';
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

class App extends React.Component {
    constructor(){
        super();
        this.state ={
            cart: [],
            data: [],
            isLoading: true,
            showCart: false
        };
        this.getData = this.getData.bind(this);
    }
    componentDidMount(){
        this.getData(this);
    }

    componentDidUpdate(){
        this.getData(this);
    }

    getData(App){
        Axios.get('/getAll?make=All&model=All', {
            cancelToken:source.token
            }).then(response => {
                this.setState({
                    data: response.data,
                    isLoading: false
                });
            }).catch(function(thrown){
                if(Axios.isCancel(thrown)){
                    console.log('Request Cancelled', thrown.message);
                }
                else{
                    console.log('Error. something happened');
                }
            });
    }

    render(){
            return(
                <div className="customer-main">
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
                        {
                            this.state.showCart ? (
                                <ShoppingCart cartProp={this.state.cart}/>
                            ) : (                       
                                <div className="customer-container">
                                <h1>Plan ahead and Travel worry-free</h1>
                                    <div className="carousel">
                                        {!this.state.isLoading ?
                                            (
                                                this.state.data.map(function(rental){
                                                    return <Tile rentalProp={rental} key={rental._id}/>
                                                })
                                            ) 
                                            : 
                                            (
                                                <p>Loading...</p>
                                            )}
                                    </div>
                                </div>
                                )
                        }
                </div>
            );
        }
    }
export default withRouter(App);