import React, { useState } from "react";
import './FaceRecognition.css'
import goBack from '../../assets/goBack.png'

const FaceRecognition = ({boxes, imageUrl,logoArray,onRouteChange}) =>{



    const boxs = boxes.map((box,index) => {
        return(
            <div className="bounding-box" key={index} 
            style={{top:box.top_row, right:box.right_col, bottom:box.bottom_row, left:box.left_col}}></div>
        );
    })

    const Logos = logoArray.map((name,index) => <h4 key={index}>{name}</h4>)


    return(
        <div className="centering ma pa3 detection-section">
            <div className="go-back flex__center" onClick={() => onRouteChange('home')}>
                <img src={goBack} alt="go-back"></img>
            </div>
            
            {logoArray.length > 0 &&
                <div className="logos-info">
                    <h3>Logos:</h3>
                    <div className="logos-info_logo">
                        {Logos}
                    </div>
                </div>
            }
            <div className="detection-img-wrapper">
                <div className=" detection-img">
                    <img id="inputimage" alt="" src={imageUrl}/>

                    {boxs}
                    
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;