import { Link } from "react-router";
import type { Route } from "./+types/logout";
import { useAuth } from "~/context/useAuth"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Logout() {
    const { logoutUser } = useAuth()
    logoutUser()
    return (
        <>
            <h1>Logout</h1>
            <p>You have been logged out, please click <Link to="/login">here</Link> to log back in </p>
        </>
    )
}
