import type {Route} from "../../../.react-router/types/app/routes/garage/+types";
import {getGarages} from "~/api";
import ShowGaragePreview from "~/components/Garage";
import type {garagePreview} from "~/models/all";

export async function clientLoader() {
    return getGarages();
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Index({loaderData}: Route.ComponentProps) {
    if (loaderData != null && loaderData.status == 200) {
        return showGarages(loaderData.garages.results);
    } else {
        return (
            <>
                <h1>Garages</h1>
                <p>No garages found!</p>
            </>
        )
    }
}

function showGarages(garages: garagePreview[]) {
    return (
        <>
            <h1>All Garages</h1>
            <div className="row">
                {garages.map(function (garage: garagePreview) {
                    return (
                        <div className="col-xl-4 col-md-6" key={garage.garage_id}>
                            <ShowGaragePreview garage={garage}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}