import React from 'react'
import Axios from 'axios';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring')
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

export default class Update extends React.Component {
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
            modalIsOpen: false,
            messageFromServer: ''
        }
        
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.update = this.update.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount(){
        this.setState({
            _id: this.props.rental._id,
            year: this.props.rental.year,
            make: this.props.rental.make,
            model: this.props.rental.model,
            description: this.props.rental.description,
            amount: this.props.rental.amount,
            available: this.props.rental.available
        });
    }

    componentWillUnmount(){
        source.cancel('Operation aborted')
    }

    openModal(){
        this.setState({
            modalIsOpen: true,
        });
    }

    closeModal(){
        this.setState({
            modalIsOpen: false,
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

    onClick(e){
        this.update(this)
    }

    update(e){
        Axios.post('/update', querystring.stringify({
            _id: e.state._id,
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
        if(this.state.messageFromServer == ''){
            return (
                <div>
                    <Button variant="warning" size="small" onClick={this.openModal}><span className="fa fa-edit"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Edit Rental"
                        className="Modal">
                         <Link to={{pathname: '/admin', search: '' }} style={{ textDecoration: 'none' }}>
                        <Button variant="danger" size="mini" onClick={this.closeModal}><span className="closebtn fa fa-remove"></span></Button>
                    </Link><br/>
                    <fieldset>
                        <div>
                        <label htmlFor="year">Year:</label>
                            <select _id="year" name="year" value={this.state.year} onChange={this.handleSelectChange}>
                                <option value="2020" _id="20" defaultValue>2020</option>
                                <option value="2019" _id="20">2019</option>
                                <option value="2018" _id="20">2018</option>
                                <option value="2017" _id="20">2017</option>
                                <option value="2016" _id="20">2016</option>
                                <option value="2015" _id="20">2015</option>
                                <option value="2014" _id="20">2014</option>
                                <option value="2013" _id="20">2013</option>
                                <option value="2012" _id="20">2012</option>
                                <option value="2011" _id="20">2011</option>
                                <option value="2010" _id="20">2010</option>
                            </select>
                        </div>
                        <div>
                        <label htmlFor="make">Make:</label>
                            <select _id="make" name="make" value={this.state.make} onChange={this.handleSelectChange}>
                                <option value="Acura" _id="Acura" defaultValue>Acura</option>
                                <option value="Audi" _id="Audi">Audi</option>
                                <option value="Alpha" _id="Alpha">Alpha</option>
                                <option value="BMW" _id="BMW">BMW</option>
                                <option value="Bently" _id="Bently">Bently</option>
                                <option value="Chevrolet" _id="Chevrolet">Chevrolet</option>
                                <option value="Dodge" _id="Dodge">Dodge</option>
                                <option value="Ford" _id="Ford">Ford</option>
                                <option value="Honda" _id="Honda">Honda</option>
                                <option value="Kia" _id="Kia">Kia</option>
                                <option value="Lexus" _id="Lexus">Lexus</option>
                                <option value="Porsche" _id="Porsche">Porsche</option>
                                <option value="Tesla" _id="Tesla">Tesla</option>
                                <option value="Volvo" _id="Volvo">Volvo</option>                                
                            </select>
                        </div>
                        <div><label htmlFor="model">Model:</label><input type="text" _id="model" name="model" value={this.state.model} onChange={this.handleTextChange}></input></div>
                        <div><label htmlFor="amount">Amount: $</label><input type="text" _id="amount" name="amount" value={this.state.amount} onChange={this.handleTextChange}></input></div>
                        <div><label htmlFor="description">Description:</label><input type="text" _id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input></div>
                        <div><label htmlFor="available">Available?</label>
                            <select _id="available" name="available" value={this.state.available} onChange={this.handleSelectChange}>
                                <option value="yes" _id="yes" defaultValue>Yes</option>
                                <option value="no" _id="no">No</option>                                
                            </select>
                        </div>                       
                        
                    </fieldset>
                    <div className='button-center'>
                            <br/>
                            <Button variant="success" size="small" onClick={this.onClick}>Update</Button>
                    </div>
                    </Modal>
                </div>
            )
        }
        else{
            return (
                <div>
                    <Button variant="warning" size="small" onClick={this.openModal}><span className="fa fa-pencil"></span></Button>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Expense"
                    className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{pathname: '/admin', search: '' }} style={{ textDecoration: 'none' }}>
                                <Button variant="success" size="mini" onClick={this.closeModal}>Close the Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
}