import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

export default function ButtonLaoding() {
        const [isLoading, setLoading] = useState(false);
      
        useEffect(() => {
          if (isLoading) {
            simulateNetworkRequest().then(() => {
              setLoading(false);
            });
          }
        }, [isLoading]);
      
        const handleClick = () => setLoading(true);
      
        return (
          <button
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
          >
            {isLoading ? <FontAwesomeIcon icon={['fab', 'apple']} /> : 'Click to load'}
          </button>
        );
      }    
