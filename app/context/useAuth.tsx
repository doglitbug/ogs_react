import React, { createContext, useEffect, useState } from "react";
import type { UserProfile } from "../models/User";
import { useNavigate } from "react-router";

type UserContextType = {
    //user: UserProfile | null;
    token: string | null;
    //registerUser(username: string, email: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
    //isAdmin: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
        setIsReady(true);
    }, [])


    //const registerUser = async...

    const loginUser = async (
        username: string,
        password: string
    ) => {
        fetch('http://doglitbug.com:82/api/v1/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => { return response.json() })
            .then((data) => {
                if (data.message === 'success') {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    navigate('/profile')
                } else {
                    alert(data.message)
                }
            })
    }

    const isLoggedIn = () => {
        return !!token;
    }

    const logoutUser = () => {
        //Added useEffect to stop Cannot update a component while rendering a different component warning
        //https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
        useEffect(()=>{
            localStorage.removeItem("token")
            setToken("")
        })
    }

    return (
        <UserContext.Provider value={{ loginUser, token, isLoggedIn, logoutUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);