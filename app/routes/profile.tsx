import type {Route} from "./+types/profile";
import {getUser} from "~/api";
import type {callToAction, userProfile} from "~/models/all";
import CallToAction from "~/components/CallToAction";

export async function clientLoader({params}: Route.LoaderArgs) {
    return getUser();
}

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Online Garage Sale: Profile"},
        {name: "description", content: "Welcome to the Online Garage Sale!"},
    ];
}

export default function Profile({loaderData}: Route.ComponentProps) {
    if (loaderData != null && loaderData.status == 200) {
        return ShowProfile(loaderData.user);
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
            <div className="rounded">
                <dl>
                    <dt>Username</dt>
                    <dd>{user.username}</dd>

                    <dt>Full name</dt>
                    <dd>{user.name}</dd>

                    <dt>Email address</dt>
                    <dd>{user.email}</dd>

                    <dt>Location</dt>
                    <dd>{user.location}</dd>

                    <dt>User type</dt>
                    <dd>{user.role}</dd>

                    <dt>About me</dt>
                    <dd>{user.description}</dd>
                </dl>
            </div>
        </>
    )
}