import type {Route} from "./+types/profile";
import {getUser} from "~/api";
import type {callToAction, userProfile} from "~/models/all";
import CallToAction from "~/components/CallToAction";
import Button from "react-bootstrap/Button";
import {Link} from "react-router";


export async function clientLoader({params}: Route.LoaderArgs) {
    return getUser();
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Profile({loaderData}: Route.ComponentProps) {
    if (loaderData != null && loaderData.status == 200) {
        return ShowProfile(loaderData.data.user);
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}

function ShowProfile(user: userProfile) {
    const actions: callToAction[] = [
        {
            text: "Back",
            variant: "primary",
            link: "/"
        },
        {
            text: "Edit",
            variant: "warning",
            link: "/profile/edit"
        },
        {
            text: "Delete",
            variant: "danger",
            link: "/profile/delete"
        },
    ];

    return (
        <>
            <h1>Profile:</h1>
            <CallToAction actions={actions}/>
            <ul>
                <li>{user.username}</li>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.location}</li>
            </ul>
        </>
    )
}