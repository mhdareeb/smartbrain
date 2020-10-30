import React from  'react';
import './SignIn.css';

class SignIn extends React.Component  {

    constructor(props)
    {
        super();
        this.state={
            email : '',
            password : ''
        }
    }

    onEmailChange = (event) => this.setState({email:event.target.value})
    onPasswordChange = (event) => this.setState({password:event.target.value})

    onSigninAttempt = (route) => {
        const {onRouteChange, setUserData} = this.props;
        const {email, password} = this.state;
        if(route==='register')
            onRouteChange(route);
        else{
            if(!(email.includes('@') && email.includes('.com') && password.length>=2))
                alert(`Email must have '@' and '.com', Mimimum Password length is 3`);
            else
            {
                fetch('http://192.168.0.106:3000/signin',{
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
                        alert('User not registered');
                    else if(data==='invalid')
                        alert("One or more values missing/incorrect");
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
                </form>
            </main>
        )
    }
}

export default SignIn;