import type { Route } from "./+types/profile";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Profile() {
    return (
        <>
            <h1>Profile</h1>
        </>
    )
}
