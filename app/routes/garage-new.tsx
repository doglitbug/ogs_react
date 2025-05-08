import type {Route} from "./+types/garage";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: New Garage"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function GarageNew({loaderData}: Route.ComponentProps) {

    return (
        <>
            <h1>New Garage</h1>
        </>
    )

}