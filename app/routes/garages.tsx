import type {Route} from "./+types/garages";
import {getGarages} from "~/api";
import ShowGaragePreview from "~/components/Garage";
import type {callToAction, garagePreview} from "~/models/all";
import {useLoaderData} from "react-router";
import CallToAction from "~/components/CallToAction";
import {useAuth} from "~/context/useAuth";

export async function clientLoader() {
    return getGarages();
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Garages"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Garages({loaderData}: Route.ComponentProps) {
    const {garages} = useLoaderData();
    const {isLoggedIn} = useAuth();

    let actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            icon: "arrow-left",
            link: "/",
        },
    ];

    if (isLoggedIn()) {
        actions.push({
            text: "New",
            variant: "success",
            icon: "plus",
            link: "/garage/new",
        })
    }

    //Required to set selected location to current value
    if (!garages) {
        return <>Loading</>;
    }

    return (
        <>
            <h1>All Garages</h1>
            <CallToAction actions={actions}/>
            <div className="row">
                {garages.map(function (garage: garagePreview) {
                    return (
                        <div className="col-xl-4 col-md-6" key={garage.garage_id}>
                            <ShowGaragePreview garage={garage}/>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
