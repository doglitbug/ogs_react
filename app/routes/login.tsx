import type { Route } from "./+types/login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Login() {
    return (
        <>
            <h1>Login</h1>
        </>
    )
}
