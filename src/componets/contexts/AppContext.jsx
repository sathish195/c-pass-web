import React, { useContext, useState } from "react"

const AppContext = React.createContext()

export const useAppContext = () => useContext(AppContext)

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [myName, setMyName] = useState('chan')
    const [history, setHistory] = useState([])

    const x = {
        myName,
        setHistory,
        history
    }
  return (
    <AppContext.Provider value={x}>
       {children}
    </AppContext.Provider>
  )
}