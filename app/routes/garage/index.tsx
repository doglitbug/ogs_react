import type {Route} from "../../../.react-router/types/app/routes/garage/+types";
import {getGarages} from "~/api";
import GaragePreview from "~/components/Garage";
import type {garagePreview} from "~/components/Garage";


export async function clientLoader({params}: Route.LoaderArgs) {
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
        return showGarages(loaderData.data.garages.items);
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
                    return <div className="col-lg-3 col-md-6">
                        <GaragePreview garage={garage}/>
                    </div>
                })}
            </div>
        </>
    )
}