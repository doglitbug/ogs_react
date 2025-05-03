import React, {createContext, useEffect, useState} from "react";
import type {userProfile} from "~/models/all";
import {jwtDecode} from "jwt-decode";
import {doLoginUser} from "~/api";

type UserContextType = {
    token: string | null;
    user: userProfile | null;
    //registerUser(username: string, email: string, password: string) => void;
    loginUser: (username: string, password: string) => any;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
    getUserDetails: () => userProfile | null;
    //isAdmin: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({children}: Props) => {
    const apiUrl = import.meta.env.VITE_API_URL;

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
    async function loginUser(username: string, password: string) {
        let result: any = await doLoginUser({username, password});
        if (result.status == 200) {
            localStorage.setItem('token', result.token)
            setToken(result.token)
            const user = jwtDecode<userProfile>(result.token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        }
        return result;
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