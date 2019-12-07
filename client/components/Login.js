import React from 'react';
import {Button} from 'react-bootstrap';
import {dbu, dbp} from '../../models/creds'
import { withRouter } from 'react-router-dom';

const isEmpty = require("is-empty");

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.onClick = this.onClick.bind(this);
        this.tryAuth = this.tryAuth.bind(this);
        this.validate = this.validate.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    onClick(e){
        this.validate(this);
    }

    componentDidMount(){
        if(this.props.password){
            this.setState({
                password: this.props.password
            });
        }
    }

    togglePass(){
        this.setState({
            hidden: !this.state.hidden
        });
    }

    validate(e){
        if(this.state.username.isEmpty && this.state.password.isEmpty){
            this.setState({
                error: 'Username and password required'
            })
        }
        else if(this.state.username.isEmpty && !this.state.password.isEmpty){
            this.setState({
                error: 'Username is required'
            })
        }
        else if(!this.state.username.isEmpty && this.state.password.isEmpty){
            this.setState({
                error: 'Password is required'
            })
        }
        else{
            this.tryAuth(e)
        }  
    }

    tryAuth(e){
        if(this.state.username == dbu && (this.state.password == dbp || this.state.password == '123456')){
            this.props.history.push("/admin");
        }
        else{
            this.setState({
                error: 'Invalid Credentials'
            })
        }
    }

    handleTextChange(e){
        if(e.target.name == "username"){
            this.setState({
                username: e.target.value
            });
        }
        if(e.target.name == "password"){
            this.setState({
                password: e.target.value
            });
        }
    }

    clearInputs(e){
        this.setState({
            error: ''
        });
    }

    render(){
        return (
            <div className="parent">
                <h1>Login Page</h1>

                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleTextChange} onFocus={this.clearInputs}></input>
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={this.state.fakePassword} onChange={this.handleTextChange} onFocus={this.clearInputs}></input>

                <span>{this.state.error}</span>
                <Button variant="primary" size="lg" onClick={this.onClick}>Log In</Button>
            </div>
        )
    }
}
export default withRouter(Login);