import type { Route } from "../../../.react-router/types/app/routes/garage/+types";
import { getGarage } from "~/api";
import {ShowGarage} from "~/components/Garage";

export async function clientLoader({ params }: Route.LoaderArgs) {
    return getGarage(params.garageId ? params.garageId : "");
}

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Online Garage Sale" },
        { name: "description", content: "Welcome to the Online Garage Sale!" },
    ];
}

export default function Show({ loaderData }: Route.ComponentProps) {
    if (loaderData != null && loaderData.status==200) {
        return ShowGarage(loaderData.garage);
    } else {
        return (
            <>
                <h1>Garages</h1>
                <p>Not found</p>
            </>
        )
    }
}