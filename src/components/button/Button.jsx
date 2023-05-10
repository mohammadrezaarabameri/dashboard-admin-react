import React, { useEffect, useState, useRef } from 'react'
import btn from './Button.module.css'

// function simulateNetworkRequest() {
//     return new Promise((resolve) => setTimeout(resolve, 2000));
//   }

export default function ButtonLaoding(props) {
        const [isLoading, setLoading] = useState(false);
        const buttonRef = useRef();
        
        const { nameButton, backgroundColor } = props;

        useEffect(() => {
          if (isLoading) {
            buttonRef.current.classList.add('loading')
            setTimeout(() => {
              setLoading(false);
              console.log(isLoading);
            },3000);
          }
        }, [isLoading]);
      
        const handleClick = () => setLoading(true);
      
        return (
          <button 
            ref = {buttonRef}
            className={btn.button}
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
            style={{ backgronudColor: "#613fe5" }}
          >
            {nameButton}
          </button>
        );
      }    
