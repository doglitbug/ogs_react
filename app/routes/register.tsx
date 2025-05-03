import type { Route } from "./+types/login";
import { useAuth } from "~/context/useAuth"

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale: Register" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Register() {

    return (
        <>
            <h1>Register:</h1>
            <div>TO DO!</div>
        </>
    )
}
