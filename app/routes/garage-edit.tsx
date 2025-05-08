import type {Route} from "./+types/garage";
import {getGarage} from "~/api";

export async function clientLoader({params}: Route.LoaderArgs) {
    return getGarage(params.garageId ? params.garageId : "");
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Edit Garage"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function GarageEdit() {

    return (
        <>
            <h1>Edit Garage</h1>
            <p>TODO</p>
        </>
    )

}