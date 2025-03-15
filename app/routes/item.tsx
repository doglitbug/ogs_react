import type { Route } from "./+types/item";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Item() {
    return (
        <>
            <h1>Items</h1>
        </>
    )
}
