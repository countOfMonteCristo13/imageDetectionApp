import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onSubmit,choice}) =>{

    let logosRequirement = '';

    if(choice === 'logo'){
        logosRequirement = '(Popular beverages,automotive and fashion brands)';
    }

    return(
        <div className="linkform-section">
            <div className="centering">
                <p className="white magic-brain">
                    {`This Magic Brain will detect ${choice}s${logosRequirement} in your pictures. Give it a try...`}
                </p>
            </div>
            <div className="centering linkform-input">
                <div className="form br3 shadow-5 linkform-input-section">
                    <input className="pa2 center detect-input" type='text' placeholder="Place your URL here" onChange={onInputChange}/>
                    <button className="link ph3 pv2 dib white detect-btn" onClick={() => onSubmit(choice)}>Detect</button>
                </div>
                
            </div>
        </div>

    );
}

export default ImageLinkForm;