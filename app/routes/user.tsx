import type { Route } from "./+types/user";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function User() {
    return (
        <>
            <h1>Users</h1>
        </>
    )
}
