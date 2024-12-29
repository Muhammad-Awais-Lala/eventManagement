
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { deleteData, Toastify } from '../components/Global'


const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }

const reducer = (state, { action, payload }) => {
    switch (action) {
        case "SET_LOGED_IN":
            return { ...state, isAuth: true, user: payload.user }
        case "SET_LOGED_OUT":
            return initialState
        default:
            return state
    }
}

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)



const handleLogout = () => {
    dispatch({ action: "SET_LOGED_OUT" })
        dispatch({ action: "SET_LOGED_OUT", payload: {  } })
        deleteData("jwtToken")
        Toastify("Logout Successfully", "success")
        console.log("Logout called")
  }



    useEffect(() => {
        setTimeout(() => {
            setIsAppLoading(false)
        }, 1000)
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout,isAppLoading,setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}