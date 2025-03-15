import type { Route } from "./+types/logout";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Logout() {
    return (
        <>
            <h1>Logout</h1>
        </>
    )
}
