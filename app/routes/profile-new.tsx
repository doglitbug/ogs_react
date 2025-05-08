import type { Route } from "./+types/login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale: New Profile" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function ProfileNew() {
    return (
        <>
            <h1>New profile:</h1>
            <div>TO DO!</div>
        </>
    )
}
