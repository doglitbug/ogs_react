import type {Route} from "./+types/garage";
import {getGarage} from "~/api";
import type {callToAction, user} from "~/models/all";
import {Link, useLoaderData} from "react-router";
import CallToAction from "~/components/CallToAction";

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

    const actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            icon: "arrow-left",
            link: "/"
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
            <div className="rounded">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Details:</h2>
                        <table className="table table-hover">
                            <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{garage['name']}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{garage['location']}</td>
                            </tr>
                            <tr>
                                <th>Visible</th>
                                <td>{garage['visible'] ? 'Visible to public' : 'Hidden from public'}</td>
                            </tr>

                            <tr>
                                <th>Description</th>
                                <td>{garage['description']}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-6">
                        <h2>Contact:</h2>
                        <table className="table table-hover">
                            <tbody>
                            <tr>
                                <td> This is only available to registered users.<br/>Please click <Link
                                    to="/login">here</Link> to log in or sign up
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}