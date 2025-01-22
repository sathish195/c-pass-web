// import React, { useContext } from 'react'
// import { useAppContext } from './AppContext'

// const UserContext = React.createContext()

// export const userUserContext = () => useContext(UserContext)

// // eslint-disable-next-line react/prop-types
// export const UserContextProvider = ({ children }) => {

//     const { setHistory } = useAppContext()

//     const getHistory = () => {
//         console.log("get history called")
//         setTimeout(() => {
//             setHistory([{ name: 'history1' }, { name: 'history2' }])
//         }, 2000);
//     }

//     const value = {
//         getHistory
//     }
//   return (
//     <UserContext.Provider value={value}>
//         {children}
//     </UserContext.Provider>
//   )
// }