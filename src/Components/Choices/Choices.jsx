import React from 'react'
import './choices.css'

import faceDetectionLogo from '../../assets/faceDetectionLogo.png'
import logoDetectionLogo from '../../assets/logoDetectionLogo.png'

const Choices = ({onRouteChange}) => {
  return (
    <div className='logos-wrapper'>
        <div className='logos-section'>
            <div className='logos-title'>
                <h2 className='fw6'>Choose Your Detection</h2>
            </div>
            <div className='logos flex__center'>
                <div className='logo' onClick={() => onRouteChange('face')}>
                    <h3>Face Detection</h3>
                    <img src={faceDetectionLogo} alt="face detection" />
                </div>
                <div className='logo' onClick={() => onRouteChange('items')}>
                    <h3>Logo Detection</h3>
                    <img src={logoDetectionLogo} alt="items detection" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Choices
