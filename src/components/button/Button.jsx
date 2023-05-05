import React, { useEffect, useState, useRef } from 'react'
import './Button.css'

// function simulateNetworkRequest() {
//     return new Promise((resolve) => setTimeout(resolve, 2000));
//   }

export default function ButtonLaoding(props) {
        const [isLoading, setLoading] = useState(false);
        const buttonRef = useRef();
        const {nameButton} = props;

        useEffect(() => {
          if (isLoading) {
            buttonRef.current.classList.add('loading')
            // simulateNetworkRequest().then(() => {
              setLoading(false);
            // });
          }
        }, [isLoading]);
      
        const handleClick = () => setLoading(true);
      
        return (
          <button className='button'
            ref = {buttonRef}
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
          >
            {nameButton}
          </button>
        );
      }    
