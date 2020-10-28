import React from  'react';
import './Register.css'

class Register extends React.Component {
    
    constructor(props)
    {
        super();
        this.state={
            name:'',
            email : '',
            password : ''
        }
    }

    onNameChange = (event) => this.setState({name:event.target.value})
    onEmailChange = (event) => this.setState({email:event.target.value})
    onPasswordChange = (event) => this.setState({password:event.target.value})

    onRegistrationAttempt = (route) => {
        const {onRouteChange} = this.props;
        if(route==='signin')
            onRouteChange(route);
        else{
            fetch('http://192.168.0.106:3000/register',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name : this.state.name,
                    email : this.state.email,
                    password : this.state.password
                })
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data==='exists')
                    console.log("user already exists");
                else
                   onRouteChange('signin');
            })
            .catch(err=>console.log("error=",err));
        }
    }

    render(){
        return (
            <main className="ontop pv5 black-80 bg-redi" id="register">
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
                        <input onClick={()=>this.onRegistrationAttempt('register')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>this.onRegistrationAttempt('signin')} className="f6 link dim black db pointer">Already Registered? Sign In</p>
                    </div>
                </form>
            </main>
        );
    }
}

export default Register;