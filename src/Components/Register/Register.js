import React from  'react';

const Register = ({onRouteChange}) => {
    return (
        <main className="ontop pv5 black-80 bg-redi" >
            <form className="ba bw1 pa4 shadow-5 measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" for="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input onClick={()=>onRouteChange('signin')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Register" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick={()=>onRouteChange('signin')} className="f6 link dim black db pointer">Already Registered? Sign In</p>
                </div>
            </form>
        </main>
    )
}

export default Register;