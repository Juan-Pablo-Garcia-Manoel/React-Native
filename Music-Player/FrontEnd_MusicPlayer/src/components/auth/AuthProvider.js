import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../../service/ServiceUtil"


const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const login = (login, senha) => {

        const userApi = loginApi(login, senha);

        if (!userApi) {
            return userApi
        } else {
            setUser (
                {
                    login: userApi.login,
                    profile: userApi.profile,
                    token: userApi.token
                }
            )
            return true
        }
    }

    const logout = () => {
        setUser(null)
    }

    const tipoUser = () => {
        if (user === null) {
            return null
        } else {
            return user.profile
        }
    }
    const isComum = () => {
        return tipoUser() === 'comum'
    }
    const isAdmin = () => {
        return tipoUser() === 'admin'
    }

    return (
        <AuthContext.Provider value={{
            user, login, logout,
            isComum, isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export { useAuth, AuthProvider }