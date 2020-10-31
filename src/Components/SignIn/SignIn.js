import React from  'react';
import './SignIn.css';

class SignIn extends React.Component  {

    constructor(props)
    {
        super();
        this.state={
            email : '',
            password : '',
            displayError : 'none'
        }
    }

    onEmailChange = (event) => this.setState({email:event.target.value, displayError:'none'})
    onPasswordChange = (event) => this.setState({password:event.target.value, displayError:'none'})

    onSigninAttempt = (route) => {
        const {onRouteChange, setUserData, showError} = this.props;
        const {email, password} = this.state;
        let errorNode = document.getElementById('error');
        if(route==='register')
            onRouteChange(route);
        else{
            if(!(email.includes('@') && email.includes('.com') && password.length>=2))
            {
                this.setState({displayError:'block'});
                showError(errorNode, `Email must have '@' and '.com', Mimimum Password length is 3`);
            }
            else
            {
                fetch('https://agile-earth-63734.herokuapp.com/signin',{
                    method : 'POST',
                    headers : {'Content-Type' : 'application/json'},
                    body : JSON.stringify({
                        email : email,
                        password : password
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data==='failed')
                    {
                        this.setState({displayError:'block'})
                        showError(errorNode, 'Wrong username/password');
                    }
                    else if(data==='invalid')
                    {
                        this.setState({displayError:'block'})
                        showError(errorNode, "One or more values missing/incorrect");
                    }
                    else
                    {
                        setUserData(data);
                        onRouteChange(route);
                    }
                })
                .catch(console.log);
            }
        }
    }

    render(){
        return (
            <main className="ontop pv5 black-80" id='signin' >
                <form className="ba bw1 pa4 shadow-5 measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={()=>this.onSigninAttempt('home')} className="ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="button" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>this.onSigninAttempt('register')} className="f6 link pointer dim black db">Not a user? Register</p>
                    </div>
                    <div id="error" style={{display:this.state.displayError}} ></div>
                </form>
            </main>
        )
    }
}

export default SignIn;