import React from 'react';
import ReactDOM from 'react-dom'
import Axios from 'axios';
import Tile from './Tile';

export default class Customer extends React.Component {
    constructor(){
        super();
        this.state ={
            cart: [],
            data: []
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData(this, '');
    }

    componentDidUpdate(){
        this.getData(this, '');
    }

    getData(ev){
        Axios.get('/getAll?make=All&model=All').then(function(response){
            ev.setState({data: response.data})
        });
    }

    render(){
        return(
            <div className="customer-container">
                <h1>Plan ahead and Travel worry-free</h1>
                <div className="carousel">
                {
                    this.state.data.map(function(rental){
                        return <Tile rentalProp={rental} key={rental._id}/>
                    })
                }
                </div>
            </div>
        );
    }
}