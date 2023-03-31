import { createContext, useState, useEffect } from "react";

const Auth = createContext()

export default Auth

export const AuthProvider = ({props}) => {
    return(
        <Auth.Provider value={{'name':'fart'}}>
            {props}
        </Auth.Provider>
    )
}