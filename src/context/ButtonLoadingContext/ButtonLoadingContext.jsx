import React from 'react';

export const ButtonContext = React.createContext()

export const ButtonProvider = ({children}) => {
    let [isLoading, setLoading] = React.useState(false);

    return <ButtonContext.Provider value={{isLoading, setLoading}}>{children}</ButtonContext.Provider>
}


export const useButtonLoading = () => {
    return React.useContext(ButtonContext);
}

