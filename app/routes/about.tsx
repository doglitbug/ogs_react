import type { Route } from "./+types/about";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function About() {
    return (
        <>
            <h1>About</h1>
        </>
    )
}
