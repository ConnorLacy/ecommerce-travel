import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Axios from "axios"

var querystring = require('querystring');

class Add extends React.Component{
    constructor(){
        super();
    
        this.state = {
            year: '2020',
            make: 'Acura',
            model: '',
            description: '',
            amount: '',
            available: 'yes',
            messageFromServer: '',
            showModal: false
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewRental = this.insertNewRental.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({
            showModal: true
        });
    }

    closeModal(){
        this.setState({
            showModal: false,
            year: '',
            make: '',
            model: '',
            description: '',
            amount: '',
            available: '',
            messageFromServer: ''
        });
    }

    handleSelectChange(e){
        if(e.target.name == 'year'){
            this.setState({
                year: e.target.value
            });
        }
        if(e.target.name == 'make'){
            this.setState({
                make: e.target.value
            });
        }
        if(e.target.name == 'available'){
            this.setState({
                available: e.target.value
            });
        }
    }

    onClick(e){
        this.insertNewRental(this);
    }

    insertNewRental(e) {
        Axios.post('/insert',
        querystring.stringify({
            year: e.state.year,
            make: e.state.make,
            model: e.state.model,
            description: e.state.description,
            amount: e.state.amount,
            available: e.state.available
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    handleTextChange(e){
        if(e.target.name == "description"){
            this.setState({
                description: e.target.value
            });
        }
        if(e.target.name == "amount"){
            this.setState({
                amount: e.target.value
            });
        }
        if(e.target.name == "model"){
            this.setState({
                model: e.target.value
            })
        }
    }

    render(){
        if(this.state.messageFromServer == ''){
            return(
                <div className="add-container">
                    <Button variant="success" size="lg" onClick={this.openModal}><span className="fa fa-plus"></span>Add Rental</Button>
                    <Modal
                        show={this.state.showModal}
                        onHide={this.closeModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Rental
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <fieldset>
                            <div>
                            <label htmlFor="year">Year:</label>
                                <select id="year" name="year" value={this.state.year} onChange={this.handleSelectChange}>
                                    <option value="2020" id="20" defaultValue>2020</option>
                                    <option value="2019" id="20">2019</option>
                                    <option value="2018" id="20">2018</option>
                                    <option value="2017" id="20">2017</option>
                                    <option value="2016" id="20">2016</option>
                                    <option value="2015" id="20">2015</option>
                                    <option value="2014" id="20">2014</option>
                                    <option value="2013" id="20">2013</option>
                                    <option value="2012" id="20">2012</option>
                                    <option value="2011" id="20">2011</option>
                                    <option value="2010" id="20">2010</option>
                                </select>
                            </div>
                            <div>
                            <label htmlFor="make">Make:</label>
                                <select id="make" name="make" value={this.state.make} onChange={this.handleSelectChange}>
                                    <option value="Acura" id="Acura" defaultValue>Acura</option>
                                    <option value="Audi" id="Audi">Audi</option>
                                    <option value="Alpha" id="Alpha">Alpha</option>
                                    <option value="BMW" id="BMW">BMW</option>
                                    <option value="Bently" id="Bently">Bently</option>
                                    <option value="Chevrolet" id="Chevrolet">Chevrolet</option>
                                    <option value="Dodge" id="Dodge">Dodge</option>
                                    <option value="Ford" id="Ford">Ford</option>
                                    <option value="Honda" id="Honda">Honda</option>
                                    <option value="Kia" id="Kia">Kia</option>
                                    <option value="Lexus" id="Lexus">Lexus</option>
                                    <option value="Porsche" id="Porsche">Porsche</option>
                                    <option value="Tesla" id="Tesla">Tesla</option>
                                    <option value="Volvo" id="Volvo">Volvo</option>                                
                                </select>
                            </div>
                            <div><label htmlFor="model">Model:</label><input type="text" id="model" name="model" value={this.state.model} onChange={this.handleTextChange}></input></div>
                            <div><label htmlFor="amount">Amount: $</label><input type="text" id="amount" name="amount" value={this.state.amount} onChange={this.handleTextChange}></input></div>
                            <div><label htmlFor="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input></div>
                            <div><label htmlFor="available">Available?</label>
                                <select id="available" name="available" value={this.state.available} onChange={this.handleSelectChange}>
                                    <option value="yes" id="yes" defaultValue>Yes</option>
                                    <option value="no" id="no">No</option>                                
                                </select>
                            </div>                       
                            
                        </fieldset>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" size="small" onClick={this.onClick}>Add Rental Car</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        else{
            return(
                <div className="add-container">
                    <Button variant="success" size="lg" onClick={this.openModal}><span className="fa fa-plus"></span></Button>
                    <Modal
                        show={this.state.showModal}
                        onHide={this.closeModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Success
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Rental Added!</h4>
                            <p>
                            Your rental was added successfully. See the new entry below and tap on
                            the yellow button to update your entry if needed.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    }
}

export default Add;