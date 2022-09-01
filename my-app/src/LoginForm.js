import React from "react";
import axios from "axios";

import './css/LoginForm.css';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessages:{},
      usernameValid: false,
      passwordValid: false,
      formValid: false
    }
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    var usernameValid = this.state.usernameValid;
    var passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'username':
        usernameValid = value.length >= 3 && value.length <= 30;
        break;
      case 'password':
        passwordValid = value.length >= 4 && value.length <= 30;
        break;
      default:
        break;
    }

    this.setState({
                    usernameValid: usernameValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: (this.state.usernameValid && this.state.passwordValid) });
  }

  handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    localStorage.clear(); //// TODO

    const requestOptions = {
      login: this.state.username,
      password: this.state.password
    }

    axios.post('auth', requestOptions)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.props.navigate('/certificates');
      })
      .catch((error) => {
        this.setState({errorMessages : { name: "credentials", message: error.response.data.errorMessage }});
      })
  }

  renderErrorMessage = (name) => {
    return(
      name === this.state.errorMessages.name && (
        <div className="error">{this.state.errorMessages.message}</div>)
    );
  }

  renderForm = () => {
    return(
      <div className="form">
      <form onSubmit={this.handleSubmit}>
        <div className="input-container">
          <input type="text" name="username" value={this.state.username} onChange={this.handleUserInput}
                required placeholder="Username" />
        </div>
        <div className="input-container">
          <input type="password" name="password" value={this.state.password} onChange={this.handleUserInput}
                required placeholder="Password" />
          {this.renderErrorMessage("credentials")}
        </div>
        <div className="button-container">
          <input type="submit" value="Login" disabled={this.state.formValid ? false : true}/>
        </div>
      </form>
    </div>
    );
  }

  render() {
    return(      
      <div className="login-form">
        <div className="title">Login</div>
        {this.renderForm()}
      </div> 
    )
  }
}

export default LoginForm;
