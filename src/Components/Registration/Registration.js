import React from "react";




// const Registration = ({onRouteChange}) =>{
class Registration extends React.Component{

    constructor(props){ // ovo props je ono sto smo koristili kada smo u App.js pozivali SignIn
        super(props);
        this.state = {
            email: '',
            password: '',
            name:''
        }
    }

    

    onNameChange = (event) =>{
        this.setState({name:event.target.value});
    }

    onEmailChange = (event) =>{
        this.setState({email:event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password:event.target.value});
    }

    onSubmit = () =>{
        fetch('http://localhost:3001/register',{
            method:'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        
        
    }

    render(){
        return(
            <div className="forma-wrapper">

                <div className=" mv4 w-100 center forma"> 
                    <main className=" bg-black forma-section">
                        <div className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="fw6 ph0 mh0 white forma-title">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent  w-100 white forma-input" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent  w-100 white forma-input" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
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
                                onClick={this.onSubmit}
                                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
                                type="submit" 
                                value="Register"
                            />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
     }


}

export default Registration;