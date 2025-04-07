import React from  'react';
import './Register.css'
import config from '../../config';

class Register extends React.Component {
    
    constructor(props)
    {
        super();
        this.state={
            name:'',
            email : '',
            password : '',
            displayError : 'none'
        }
    }

    onNameChange = (event) => this.setState({name:event.target.value, displayError:'none'})
    onEmailChange = (event) => this.setState({email:event.target.value, displayError:'none'})
    onPasswordChange = (event) => this.setState({password:event.target.value, displayError:'none'})

    onRegistrationAttempt = (route) => {
        const {onRouteChange, showError} = this.props;
        const {name, email, password} = this.state;
        let errorNode = document.getElementById('error');
        if(route==='signin')
            onRouteChange(route);
        else{
            if(!(name.length>0 && email.includes('@') && email.includes('.com') && password.length>=3))
            {
                this.setState({displayError:'block'});
                showError(errorNode, `Name cannot be empty, Email must have '@' and '.com', Mimimum Password length is 3`);
            }
            else
            {
                fetch(config.base_url + '/register', {
                    method : 'POST',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({
                        name : name,
                        email : email,
                        password : password
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data==='exists')
                    {
                        this.setState({displayError:'block'});
                        showError(errorNode, "User already registered");
                    }
                    else if(data==='invalid')
                    {
                        this.setState({displayError:'block'});
                        showError(errorNode, "One or more values missing/incorrect");
                    }
                    else if(data==='failed')
                    {
                        this.setState({displayError:'block'});
                        showError(errorNode, 'Failed to register user!');
                    }
                    else
                        onRouteChange('signin');
                })
                .catch(console.log);
            }
        }
    }

    render(){
        return (
            <main className="ontop pv5 black-80" id="register">
                <form className="ba bw1 pa4 shadow-5 measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={()=>this.onRegistrationAttempt('register')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="button" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>this.onRegistrationAttempt('signin')} className="f6 link dim black db pointer">Already Registered? Sign In</p>
                    </div>
                    <div id="error" style={{display:this.state.displayError}}></div>
                </form>
            </main>
        );
    }
}

export default Register;