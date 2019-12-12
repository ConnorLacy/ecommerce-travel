import React from 'react';
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap';
import {changeCart} from '../cart';

export default class Tile extends React.Component {
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
            hasButton: '',
        }
        this.onClick = this.onClick.bind(this);
        this.changeState = this.changeState.bind(this);
        this.toggleSelectedClass = this.toggleSelectedClass.bind(this);
        this.modifyCart = this.modifyCart.bind(this);
    }
    
    componentDidMount(){
        this.changeState();
    }

    shouldComponentUpdate(nextState, nextProps){
        if(nextProps._id != this.state._id){
            return true;
        }
        else{
            return false
        }
    }

    changeState(){
        this.setState({
            _id: this.props.rentalProp._id,
            year: this.props.rentalProp.year,
            make: this.props.rentalProp.make,
            model: this.props.rentalProp.model,
            description: this.props.rentalProp.description,
            amount: this.props.rentalProp.amount,
            available: this.props.rentalProp.available,
            hasButton: this.props.hasButton
        });
    }

    onClick(e){
        if(e.target.className.includes("rental-tile")){
            this.toggleSelectedClass(e);
        }
        else{
            this.modifyCart(e)
        }
    }

    toggleSelectedClass(e){
        let x = document.getElementsByClassName("selected");
        console.log(x)
        if(e.target.className.includes('Booked')){}
        else{
            if(e.target.className.includes("rental-tile") && !(e.target.className.includes("selected"))){
                if(x.length > 0){
                    for(let i=0; i<x.length; i++){
                        x[i].classList.remove("selected");
                    }
                }
                e.target.classList.add("selected");
            }
            else if(e.target.className.includes("rental-tile") && (e.target.className.includes("selected"))){
                e.target.classList.remove("selected");
            }
        }
    }

    modifyCart(e){
        changeCart({...this.props.rentalProp});
    }

    render(){
        let className = (this.state.available == 'yes') ? 'rental-tile Available fadeInTotal' : 'rental-tile Booked fadeInPartial';
        return (
            <div className={className} onClick={this.onClick}>
                <img src="https://www.paylesscar.com/content/dam/cars/l/2017/nissan/2017-nissan-versa-sv-auto-sedan-blue_featured.png" width="250" height="250"/>
                <h3>{this.state.year} {this.state.make} {this.state.model}</h3>
                <p>{this.state.description}</p>
                <h3>{className.split(" ")[1]}</h3>
                {this.state.hasButton ? (<Button variant="light" size="sm" className="cart-button" onClick={this.onClick}><span className="fa fa-plus"></span> Add to Cart</Button>) : (<p style={{display: 'none'}}></p>)}
            </div>
        );
    }
}