import React from "react";


// const SignIn = ({onRouteChange}) =>{ Ovo menjamo jer zelimo da nam SignIn ima stanja(state)
class SignIn extends React.Component{

    constructor(props){ // ovo props je ono sto smo koristili kada smo u App.js pozivali SignIn
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail:event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword:event.target.value});
    }

    onSubmitSignIn = () =>{
        fetch('http://localhost:3001/signin',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user.id){
            this.props.onRouteChange('home');
            this.props.loadUser(user);
            }
        })
        
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div className="forma-wrapper">

                <div className="mv4 w-100 center forma">
                    <main className=" bg-black forma-section">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="fw6 ph0 mh0 white forma-title">Sign In</legend>
                            <div className="mt3 white">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent w-100 white forma-input" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3 white">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent w-100 white forma-input" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            </fieldset>
                            <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
                                type="submit" 
                                value="Sign in"
                            />
                            </div>
                            <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('registration')} href="#0" className="f6 link dim black db pointer white">Register</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

}

export default SignIn;