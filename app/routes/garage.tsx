import type {Route} from "./+types/garage";
import {getGarage} from "~/api";
import type {callToAction, user} from "~/models/all";
import {Link, useLoaderData} from "react-router";
import CallToAction from "~/components/CallToAction";
import {useAuth} from "~/context/useAuth";

export async function clientLoader({params}: Route.LoaderArgs) {
    return getGarage(params.garageId ? params.garageId : "");
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Show Garage"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Garage() {
    const {garage} = useLoaderData();
    const {isLoggedIn} = useAuth();

    const actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            icon: "arrow-left",
            link: "/garage"
        },
        {
            text: "Edit",
            variant: "warning",
            icon: "pencil",
            link: "/garage/" + garage.garage_id + "/edit"
        },
        {
            text: "Delete",
            variant: "danger",
            icon: "trash3",
            link: "/garage/" + garage.garage_id + "/delete"
        },
    ];

    return (
        <>
            <h1>Show Garage: {garage['name']}</h1>
            <CallToAction actions={actions}/>
            <div className="row">
                <div className="col-md-6">
                    <div className="rounded">
                        <h2>Details:</h2>
                        <dl>
                            <dt>Name</dt>
                            <dd>{garage.name}</dd>
                            <dt>Location</dt>
                            <dd>{garage.location}</dd>
                            <dt>Description</dt>
                            <dd>{garage.description}</dd>
                        </dl>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="rounded">
                        <h2>Contact:</h2>
                        {isLoggedIn() ?
                            <ul>
                                {garage.staff.map(function (staff: user) {
                                    return (
                                        <li key={staff.user_id}>{staff.access}: {staff.name} ({staff.username})&nbsp;<a
                                            href={"mailto:" + staff.email}>Email</a>
                                        </li>
                                    );
                                })}
                            </ul> : <>Only available to registered users</>
                        }
                    </div>
                </div>

            </div>

            <h2>TODO Garage Items and filter here</h2>
        </>
    )
}