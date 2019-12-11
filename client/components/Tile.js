import React from 'react';
import ReactDOM from 'react-dom'


export default class Tile extends React.Component {
    constructor(){
        super();
        this.state = {
            id: '',
            year: '',
            make: '',
            model: '',
            description: '',
            amount: '',
            available: ''
        }
    }
    
    componentDidMount(){
        this.setState({
            id: this.props.rentalProp.id,
            year: this.props.rentalProp.year,
            make: this.props.rentalProp.make,
            model: this.props.rentalProp.model,
            description: this.props.rentalProp.description,
            amount: this.props.rentalProp.amount,
            available: this.props.rentalProp.available
        });
    }

    render(){
        return (
            <div className={(this.state.available) ? 'rental-tile available': 'rental-tile unavailable'} >
                <img src="https://www.paylesscar.com/content/dam/cars/l/2017/nissan/2017-nissan-versa-sv-auto-sedan-blue_featured.png" width="250" height="250"/>
                <h1>{this.state.year}{this.state.make}{this.state.model}</h1>
                <p>{this.state.description}</p>
                <h3>{this.state.available}</h3>
            </div>
        );
    }
}