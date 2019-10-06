import React, { Component } from 'react';
import './Login.css';
import AuthService from './AuthService';

class Login extends Component {

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.Auth = new AuthService("");
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        if(this.Auth.loggedIn()) {
            this.props.history.replace('/');
        }
    }
    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={ (e) => this.handleFormSubmit(e) } method="POST">
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        e.preventDefault();

        if(!this.state || !this.state.username || !this.state.password) {
            alert("Username/Password is invalid");
        } else {
            this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
        }
    }
}

export default Login;