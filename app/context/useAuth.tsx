import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import type {userProfile} from "~/models/all";
import {jwtDecode} from "jwt-decode";
import type {JwtPayload} from "jwt-decode";

type UserContextType = {
    token: string | null;
    user: userProfile | null;
    //registerUser(username: string, email: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
    getUserDetails: () => userProfile | null;
    //isAdmin: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<userProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
        }
        setIsReady(true);
    }, [])


    //const registerUser = async...
    // TODO https://www.youtube.com/watch?v=h3_YKC2VGfE&list=PL82C6-O4XrHcJhPkcWkzFnjEBiAtpWGrw&index=2

    //TODO refactor this to use status codes and the API
    const loginUser = async (
        username: string,
        password: string
    ) => {
        fetch('http://doglitbug.com:82/api/v1/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.message === 'success') {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    const user = jwtDecode<userProfile>(data.token);
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                    navigate('/profile')
                } else {
                    alert(data.message)
                }
            })
    }

    const logoutUser = () => {
        //Added useEffect to stop Cannot update a component while rendering a different component warning
        //https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
        useEffect(() => {
            localStorage.removeItem("token")
            setToken("")
            localStorage.removeItem("user")
            setUser(null)
        })
    }

    const isLoggedIn = () => {
        return !!token;
    }

    const getUserDetails = () => {
        return user;
    }



    return (
        <UserContext.Provider value={{token, user, loginUser, logoutUser, isLoggedIn, getUserDetails}}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);