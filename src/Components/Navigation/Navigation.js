import React from "react";
import './navigation.css';


const Navigation = ({onRouteChange, isSignedIn}) =>{

    
        if(isSignedIn){
            return(
                <nav style={{display:'flex',justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className=" link dim underline pa3 pointer white nav-text">Sign Out</p>
                </nav>
            );
        } else{
            return(
                <nav style={{display:'flex',justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className=" link dim underline pa3 pointer white nav-text">Sign In</p>
                    <p onClick={() => onRouteChange('registration')} className=" link dim underline pa3 pointer white nav-text">Register</p>
                </nav>
                
            );
            
        }
    
}

export default Navigation;