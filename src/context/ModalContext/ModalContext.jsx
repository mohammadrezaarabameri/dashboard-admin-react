import React from 'react';



export const ModalContext = React.createContext({value: '', setValue: () => {}})

export const ModalProvider = ({children}) => {
    let [value, setValue] = React.useState('');

    return <ModalContext.Provider value={{value, setValue}}>{children}</ModalContext.Provider>
}


export const useModal = () => {
    return React.useContext(ModalContext);
}

