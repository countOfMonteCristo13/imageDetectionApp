import React from "react";
import Tilty from 'react-tilty';
import './Logo.css'
import brain1 from './img/brain1.png';




const Logo = () =>{

    return(
        <div className="ma4">
            <div className="logo-img">
                <img alt="brain-logo" src={brain1}/>
            </div>
        </div>
    );
}

export default Logo;