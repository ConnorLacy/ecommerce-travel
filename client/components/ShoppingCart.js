import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';


export default class ShoppingCart extends React.Component{
    constructor(){
        super();
        this.state = {
            cart: []
        }
    }


    componentDidMount(){
        console.log(this.props.cartProp)
        this.setState({
            cart: this.props.cartProp,
        });
    }

    render(){
        return(
            <div className="cart">
                <h1>Ready to checkout?</h1>
                <Tile rental={this.state.cart}/>                
            </div>
        );
    }
}