import type {Route} from "./+types/profile";
import {getUser} from "~/api";
import type {userProfile} from "~/models/all";

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
            <>
                <h1>Profile</h1>
            </>
        )
    }
}

function ShowProfile(user: userProfile) {
    return (
        <>{user.username}</>
    )
}